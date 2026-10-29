import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InnerPageLayout } from "../components/InnerPageLayout";
import { RotaryKnob } from "../components/RotaryKnob";
import { SfxAdvancedPanel } from "../components/SfxAdvancedPanel";
import { SfxWaveScope } from "../components/SfxWaveScope";
import { useTranslation } from "../i18n/useTranslation";
import jsfxr, { sfxr, type SfxSynthDef } from "../lib/sfxr";

const PRESETS = [
  "pickupCoin",
  "laserShoot",
  "explosion",
  "powerUp",
  "hitHurt",
  "jump",
  "blipSelect",
  "click",
  "random",
] as const;

const WAVEFORMS = [
  { id: 0, key: "square" as const, glyph: "⊓" },
  { id: 1, key: "saw" as const, glyph: "╱" },
  { id: 2, key: "sine" as const, glyph: "∿" },
  { id: 4, key: "triangle" as const, glyph: "△" },
  { id: 3, key: "noise" as const, glyph: "▦" },
] as const;

type LabUi = {
  wave: number;
  dur: number;
  ptc: number;
  vol: number;
  crv: number;
  atk: number;
  dcy: number;
  sus: number;
  rls: number;
  tremOn: boolean;
  tremDpt: number;
  tremCtr: number;
  tremRate: number;
  tremPhs: number;
  tremDly: number;
  tremFade: number;
  vibOn: boolean;
  vibDpt: number;
  vibCtr: number;
  vibRate: number;
  vibPhs: number;
  vibDly: number;
  vibFade: number;
  arpOn: boolean;
  arpMod: number;
  arpSpeed: number;
};

type LabMode = "simple" | "advanced";

type ModFx = Pick<
  LabUi,
  | "tremOn"
  | "tremDpt"
  | "tremCtr"
  | "tremRate"
  | "tremPhs"
  | "tremDly"
  | "tremFade"
  | "vibOn"
  | "vibDpt"
  | "vibCtr"
  | "vibRate"
  | "vibPhs"
  | "vibDly"
  | "vibFade"
>;

function emptyFx(): ModFx {
  return {
    tremOn: false,
    tremDpt: 0,
    tremCtr: 0.5,
    tremRate: 0,
    tremPhs: 0,
    tremDly: 0,
    tremFade: 0,
    vibOn: false,
    vibDpt: 0,
    vibCtr: 0.5,
    vibRate: 0,
    vibPhs: 0,
    vibDly: 0,
    vibFade: 0,
  };
}

function defaultUi(): LabUi {
  return {
    wave: 0,
    dur: 0.55,
    ptc: 0.35,
    vol: 0.35,
    crv: 0.15,
    atk: 0,
    dcy: 0.45,
    sus: 0.25,
    rls: 0.35,
    tremOn: false,
    tremDpt: 0.4,
    tremCtr: 0.5,
    tremRate: 0.35,
    tremPhs: 0,
    tremDly: 0,
    tremFade: 0.25,
    vibOn: false,
    vibDpt: 0.35,
    vibCtr: 0.5,
    vibRate: 0.3,
    vibPhs: 0,
    vibDly: 0,
    vibFade: 0.25,
    arpOn: false,
    arpMod: 0,
    arpSpeed: 0.4,
  };
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function uiToSynth(ui: LabUi): SfxSynthDef {
  const dur = 0.25 + ui.dur * 1.35;
  const p = new jsfxr.Params();
  p.wave_type = ui.wave;
  p.sound_vol = ui.vol;
  p.sample_size = 8;
  p.sample_rate = 44100;
  p.p_base_freq = ui.ptc;
  p.p_env_attack = Math.min(1, ui.atk * dur);
  p.p_env_sustain = Math.min(1, ui.sus * dur);
  p.p_env_decay = Math.min(1, (ui.dcy * 0.65 + ui.rls * 0.55) * dur);
  p.p_env_punch = ui.crv;
  /* Vibrato depth/rate also baked for scope + WAV; live play uses WA for full 6 knobs. */
  p.p_vib_strength = ui.vibOn ? ui.vibDpt : 0;
  p.p_vib_speed = ui.vibOn ? ui.vibRate : 0;
  p.p_arp_mod = ui.arpOn ? ui.arpMod * 2 - 1 : 0;
  p.p_arp_speed = ui.arpOn ? ui.arpSpeed : 0;
  return JSON.parse(JSON.stringify(p)) as SfxSynthDef;
}

/** Live buffer: strip baked vibrato so WA LFO owns all vib knobs (no double-mod). */
function uiToLiveSynth(ui: LabUi): SfxSynthDef {
  const p = uiToSynth(ui);
  p.p_vib_strength = 0;
  p.p_vib_speed = 0;
  return p;
}

function foldSynthToUi(raw: SfxSynthDef): LabUi {
  const envSum =
    Number(raw.p_env_attack || 0) +
    Number(raw.p_env_sustain || 0) +
    Number(raw.p_env_decay || 0);
  const dur = Math.min(1, Math.max(0.15, envSum / 1.6));
  const scale = 1 / (0.25 + dur * 1.35);
  return {
    ...defaultUi(),
    wave: Number(raw.wave_type) || 0,
    dur,
    ptc: clamp01(Number(raw.p_base_freq) || 0.3),
    vol: clamp01(Number(raw.sound_vol) || 0.35),
    crv: clamp01(Number(raw.p_env_punch) || 0),
    atk: clamp01(Number(raw.p_env_attack || 0) * scale),
    sus: clamp01(Number(raw.p_env_sustain || 0) * scale),
    dcy: clamp01(Number(raw.p_env_decay || 0) * scale * 0.7),
    rls: clamp01(Number(raw.p_env_decay || 0) * scale * 0.5),
    vibOn: Number(raw.p_vib_strength || 0) > 0.02,
    vibDpt: clamp01(Number(raw.p_vib_strength || 0)),
    vibCtr: 0.5,
    vibRate: clamp01(Number(raw.p_vib_speed || 0)),
    vibPhs: 0,
    vibDly: 0,
    vibFade: 0.25,
    tremCtr: 0.5,
    tremPhs: 0,
    tremDly: 0,
    tremFade: 0.25,
    arpOn: Math.abs(Number(raw.p_arp_mod || 0)) > 0.02,
    arpMod: clamp01((Number(raw.p_arp_mod || 0) + 1) / 2),
    arpSpeed: clamp01(Number(raw.p_arp_speed || 0)),
  };
}

function uiFromPreset(name: string): LabUi {
  return foldSynthToUi(
    sfxr.generate(name, { sound_vol: 0.35, sample_size: 8, sample_rate: 44100 }),
  );
}

function cloneUi(u: LabUi): LabUi {
  return { ...u };
}

function cloneParams(p: SfxSynthDef): SfxSynthDef {
  return JSON.parse(JSON.stringify(p)) as SfxSynthDef;
}

function downloadDataUri(dataUri: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUri;
  a.download = filename;
  a.click();
}

/** Block Space only while typing text — knobs/checkboxes still play. */
function shouldIgnoreSpace(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  if (el.isContentEditable) return true;
  const tag = el.tagName;
  if (tag === "TEXTAREA" || tag === "SELECT") return true;
  if (tag === "INPUT") {
    const type = (el as HTMLInputElement).type;
    return type === "text" || type === "search" || type === "password" || type === "email" || type === "url" || type === "number";
  }
  return false;
}

export function SfxLabPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<LabMode>("simple");
  const [ui, setUi] = useState<LabUi>(() => uiFromPreset("blipSelect"));
  const [advParams, setAdvParams] = useState<SfxSynthDef>(() => uiToSynth(uiFromPreset("blipSelect")));
  const [history, setHistory] = useState<LabUi[]>([]);
  const [advHistory, setAdvHistory] = useState<SfxSynthDef[]>([]);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [loopPlaying, setLoopPlaying] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const playTimer = useRef<number | null>(null);
  const skipAutoPlay = useRef(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const fxNodesRef = useRef<AudioNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopEnabledRef = useRef(false);
  const loopPlayingRef = useRef(false);
  const modeRef = useRef<LabMode>(mode);
  const uiRef = useRef(ui);
  const advRef = useRef(advParams);

  const simpleParams = useMemo(() => uiToSynth(ui), [ui]);
  const params = mode === "simple" ? simpleParams : advParams;
  const stamp = useMemo(() => Date.now().toString(36), [params]);

  modeRef.current = mode;
  uiRef.current = ui;
  advRef.current = advParams;
  loopEnabledRef.current = loopEnabled;
  loopPlayingRef.current = loopPlaying;

  const currentDef = useCallback((): SfxSynthDef => {
    return modeRef.current === "simple" ? uiToSynth(uiRef.current) : cloneParams(advRef.current);
  }, []);

  const currentLiveDef = useCallback((): SfxSynthDef => {
    if (modeRef.current === "simple") return uiToLiveSynth(uiRef.current);
    const p = cloneParams(advRef.current);
    /* Advanced still uses baked vib; strip for WA path consistency when vib knobs N/A */
    return p;
  }, []);

  const currentFx = useCallback((): ModFx => {
    if (modeRef.current === "advanced") return emptyFx();
    const u = uiRef.current;
    return {
      tremOn: u.tremOn,
      tremDpt: u.tremDpt,
      tremCtr: u.tremCtr,
      tremRate: u.tremRate,
      tremPhs: u.tremPhs,
      tremDly: u.tremDly,
      tremFade: u.tremFade,
      vibOn: u.vibOn,
      vibDpt: u.vibDpt,
      vibCtr: u.vibCtr,
      vibRate: u.vibRate,
      vibPhs: u.vibPhs,
      vibDly: u.vibDly,
      vibFade: u.vibFade,
    };
  }, []);

  const patch = (partial: Partial<LabUi>) => {
    setUi((prev) => ({ ...prev, ...partial }));
  };

  const ensureAudioCtx = useCallback(async () => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtxRef.current) audioCtxRef.current = new AC();
    if (audioCtxRef.current.state === "suspended") await audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const tearDownGraph = useCallback(() => {
    const src = loopSourceRef.current;
    loopSourceRef.current = null;
    if (src) {
      try {
        src.onended = null;
        src.stop();
      } catch {
        /* */
      }
      try {
        src.disconnect();
      } catch {
        /* */
      }
    }
    for (const node of fxNodesRef.current) {
      try {
        if ("stop" in node && typeof (node as OscillatorNode).stop === "function") {
          (node as OscillatorNode).stop();
        }
      } catch {
        /* */
      }
      try {
        node.disconnect();
      } catch {
        /* */
      }
    }
    fxNodesRef.current = [];
    if (masterGainRef.current) {
      try {
        masterGainRef.current.disconnect();
      } catch {
        /* */
      }
      masterGainRef.current = null;
    }
  }, []);

  const stopLoop = useCallback(() => {
    tearDownGraph();
    setLoopPlaying(false);
  }, [tearDownGraph]);

  const wireFx = useCallback((ctx: AudioContext, node: AudioBufferSourceNode, fx: ModFx) => {
    const master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
    masterGainRef.current = master;
    const track: AudioNode[] = [master];
    const now = ctx.currentTime;

    if (fx.vibOn && fx.vibDpt > 0.01) {
      const center = 0.82 + fx.vibCtr * 0.36;
      const depth = fx.vibDpt * 0.22;
      const hz = 0.4 + fx.vibRate * 14;
      node.playbackRate.value = center;
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = hz;
      const depthGain = ctx.createGain();
      const dly = fx.vibDly * 1.6;
      const fade = Math.max(0.02, fx.vibFade * 2.2);
      depthGain.gain.setValueAtTime(0, now);
      depthGain.gain.setValueAtTime(0, now + dly);
      depthGain.gain.linearRampToValueAtTime(depth, now + dly + fade);
      lfo.connect(depthGain);
      depthGain.connect(node.playbackRate);
      const phaseOffset = (fx.vibPhs % 1) / Math.max(hz, 0.01);
      lfo.start(now + phaseOffset);
      track.push(lfo, depthGain);
    }

    if (fx.tremOn && fx.tremDpt > 0.01) {
      const tremGain = ctx.createGain();
      const center = 0.25 + fx.tremCtr * 0.75;
      const depth = fx.tremDpt * Math.min(center, 1 - center + 0.05) * 0.95;
      const hz = 0.4 + fx.tremRate * 12;
      tremGain.gain.value = center;
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = hz;
      const depthGain = ctx.createGain();
      const dly = fx.tremDly * 1.6;
      const fade = Math.max(0.02, fx.tremFade * 2.2);
      depthGain.gain.setValueAtTime(0, now);
      depthGain.gain.setValueAtTime(0, now + dly);
      depthGain.gain.linearRampToValueAtTime(depth, now + dly + fade);
      lfo.connect(depthGain);
      depthGain.connect(tremGain.gain);
      const phaseOffset = (fx.tremPhs % 1) / Math.max(hz, 0.01);
      lfo.start(now + phaseOffset);
      node.connect(tremGain);
      tremGain.connect(master);
      track.push(lfo, depthGain, tremGain);
    } else {
      node.connect(master);
    }

    fxNodesRef.current = track;
  }, []);

  const startPlayback = useCallback(
    async (def: SfxSynthDef, fx: ModFx, loop: boolean) => {
      try {
        const ctx = await ensureAudioCtx();
        tearDownGraph();
        const node = sfxr.toWebAudio(def, ctx) as AudioBufferSourceNode | undefined;
        if (!node || !node.buffer) return;
        node.loop = loop;
        wireFx(ctx, node, fx);
        if (!loop) {
          node.onended = () => {
            if (loopSourceRef.current === node) {
              loopSourceRef.current = null;
              setLoopPlaying(false);
            }
          };
        }
        node.start();
        loopSourceRef.current = node;
        setLoopPlaying(loop);
      } catch {
        setLoopPlaying(false);
      }
    },
    [ensureAudioCtx, tearDownGraph, wireFx],
  );

  const triggerPlay = useCallback(async () => {
    if (loopEnabledRef.current) {
      if (loopPlayingRef.current) stopLoop();
      else await startPlayback(currentLiveDef(), currentFx(), true);
      return;
    }
    await startPlayback(currentLiveDef(), currentFx(), false);
  }, [currentFx, currentLiveDef, startPlayback, stopLoop]);

  const schedulePreview = useCallback(() => {
    if (playTimer.current != null) window.clearTimeout(playTimer.current);
    playTimer.current = window.setTimeout(() => {
      if (loopEnabledRef.current && loopPlayingRef.current) {
        void startPlayback(currentLiveDef(), currentFx(), true);
      } else if (!loopEnabledRef.current) {
        void startPlayback(currentLiveDef(), currentFx(), false);
      }
    }, 70);
  }, [currentFx, currentLiveDef, startPlayback]);

  useEffect(() => {
    if (skipAutoPlay.current) {
      skipAutoPlay.current = false;
      return;
    }
    schedulePreview();
  }, [ui, advParams, mode, schedulePreview]);

  useEffect(() => {
    if (!loopEnabled) stopLoop();
  }, [loopEnabled, stopLoop]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== " ") return;
      if (e.repeat || shouldIgnoreSpace(e.target)) return;
      e.preventDefault();
      void triggerPlay();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [triggerPlay]);

  useEffect(() => {
    return () => {
      if (playTimer.current != null) window.clearTimeout(playTimer.current);
      tearDownGraph();
      void audioCtxRef.current?.close();
      audioCtxRef.current = null;
    };
  }, [tearDownGraph]);

  const switchMode = (next: LabMode) => {
    if (next === mode) return;
    skipAutoPlay.current = true;
    if (next === "advanced") {
      setAdvParams(uiToSynth(ui));
    } else {
      setUi(foldSynthToUi(advParams));
    }
    setMode(next);
  };

  const applyPreset = (name: string) => {
    if (mode === "simple") {
      setUi((prev) => {
        setHistory((h) => [...h.slice(-19), cloneUi(prev)]);
        return uiFromPreset(name);
      });
    } else {
      setAdvParams((prev) => {
        setAdvHistory((h) => [...h.slice(-19), cloneParams(prev)]);
        return cloneParams(
          sfxr.generate(name, {
            sound_vol: Number(prev.sound_vol) || 0.35,
            sample_size: Number(prev.sample_size) || 8,
            sample_rate: Number(prev.sample_rate) || 44100,
          }),
        );
      });
    }
    setShowPresets(false);
  };

  const mutate = () => {
    if (mode === "simple") {
      setUi((prev) => {
        setHistory((h) => [...h.slice(-19), cloneUi(prev)]);
        const p = new jsfxr.Params();
        p.fromJSON(uiToSynth(prev));
        p.mutate();
        return foldSynthToUi(p);
      });
    } else {
      setAdvParams((prev) => {
        setAdvHistory((h) => [...h.slice(-19), cloneParams(prev)]);
        const p = new jsfxr.Params();
        p.fromJSON(prev);
        p.mutate();
        p.sample_size = Number(prev.sample_size) || 8;
        p.sample_rate = Number(prev.sample_rate) || 44100;
        p.sound_vol = Number(prev.sound_vol) || 0.35;
        return cloneParams(p);
      });
    }
  };

  const randomize = () => applyPreset("random");

  const undo = () => {
    if (mode === "simple") {
      setHistory((h) => {
        if (h.length === 0) return h;
        const prev = h[h.length - 1];
        skipAutoPlay.current = true;
        setUi(cloneUi(prev));
        window.setTimeout(() => {
          const def = uiToSynth(prev);
          if (loopEnabledRef.current && loopPlayingRef.current) {
            void startPlayback(uiToLiveSynth(prev), {
              tremOn: prev.tremOn,
              tremDpt: prev.tremDpt,
              tremCtr: prev.tremCtr,
              tremRate: prev.tremRate,
              tremPhs: prev.tremPhs,
              tremDly: prev.tremDly,
              tremFade: prev.tremFade,
              vibOn: prev.vibOn,
              vibDpt: prev.vibDpt,
              vibCtr: prev.vibCtr,
              vibRate: prev.vibRate,
              vibPhs: prev.vibPhs,
              vibDly: prev.vibDly,
              vibFade: prev.vibFade,
            }, true);
          } else void startPlayback(uiToLiveSynth(prev), emptyFx(), false);
        }, 0);
        return h.slice(0, -1);
      });
    } else {
      setAdvHistory((h) => {
        if (h.length === 0) return h;
        const prev = h[h.length - 1];
        skipAutoPlay.current = true;
        setAdvParams(cloneParams(prev));
        window.setTimeout(() => {
          if (loopEnabledRef.current && loopPlayingRef.current) {
            void startPlayback(prev, emptyFx(), true);
          } else void startPlayback(prev, emptyFx(), false);
        }, 0);
        return h.slice(0, -1);
      });
    }
  };

  const saveWav = () => {
    const wave = sfxr.toWave(params);
    downloadDataUri(wave.dataURI, `carcamusa-sfx-${stamp}.wav`);
  };

  const canUndo = mode === "simple" ? history.length > 0 : advHistory.length > 0;

  const labRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = labRef.current;
    if (!el) return;
    /* Keep page from scrolling while the pointer is over the tool. */
    const blockScroll = (e: WheelEvent) => {
      e.preventDefault();
    };
    el.addEventListener("wheel", blockScroll, { passive: false });
    return () => el.removeEventListener("wheel", blockScroll);
  }, []);

  return (
    <InnerPageLayout titleKey="pageTitle.sfx">
      <div className="sfx-lab sfx-lab--compact" ref={labRef}>
        <header className="sfx-lab__intro">
          <div className="sfx-lab__intro-row">
            <h2>{t("sfx.heading")}</h2>
            <div className="sfx-mode-toggle" role="group" aria-label={t("sfx.modeLabel")}>
              <button
                type="button"
                className={mode === "simple" ? "sfx-lab__chip sfx-lab__chip--active" : "sfx-lab__chip"}
                onClick={() => switchMode("simple")}
              >
                {t("sfx.modeSimple")}
              </button>
              <button
                type="button"
                className={
                  mode === "advanced" ? "sfx-lab__chip sfx-lab__chip--active" : "sfx-lab__chip"
                }
                onClick={() => switchMode("advanced")}
              >
                {t("sfx.modeAdvanced")}
              </button>
            </div>
          </div>
          <p className="sfx-lab__tagline">{t("sfx.tagline")}</p>
        </header>

        <SfxWaveScope
          params={params}
          fullLabel={t("sfx.scopeFull")}
          detailLabel={t("sfx.scopeDetail")}
        />

        {mode === "simple" ? (
          <div className="sfx-modules">
            <section className="sfx-mod sfx-mod--core">
              <div className="sfx-mod__head">
                <h3>{t("sfx.modCore")}</h3>
                <button
                  type="button"
                  className="sfx-lab__btn sfx-lab__btn--primary sfx-mod__play"
                  onClick={() => void triggerPlay()}
                >
                  {loopEnabled
                    ? loopPlaying
                      ? t("sfx.stopLoop")
                      : t("sfx.startLoop")
                    : t("sfx.play")}
                </button>
              </div>

              <div className="sfx-lab__wave-row sfx-mod__waves">
                {WAVEFORMS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    title={t(`sfx.wave.${w.key}`)}
                    className={
                      ui.wave === w.id ? "sfx-lab__chip sfx-lab__chip--active" : "sfx-lab__chip"
                    }
                    onClick={() => patch({ wave: w.id })}
                  >
                    <span className="sfx-wave-glyph" aria-hidden="true">
                      {w.glyph}
                    </span>
                    {t(`sfx.wave.${w.key}`)}
                  </button>
                ))}
              </div>

              <div className="sfx-knob-row">
                <RotaryKnob label={t("sfx.dur")} value={ui.dur} onChange={(v) => patch({ dur: v })} />
                <RotaryKnob label={t("sfx.ptc")} value={ui.ptc} onChange={(v) => patch({ ptc: v })} />
                <RotaryKnob label={t("sfx.vol")} value={ui.vol} onChange={(v) => patch({ vol: v })} />
                <RotaryKnob label={t("sfx.crv")} value={ui.crv} onChange={(v) => patch({ crv: v })} />
              </div>
              <div className="sfx-knob-row">
                <RotaryKnob label={t("sfx.atk")} value={ui.atk} onChange={(v) => patch({ atk: v })} />
                <RotaryKnob label={t("sfx.dcy")} value={ui.dcy} onChange={(v) => patch({ dcy: v })} />
                <RotaryKnob label={t("sfx.sus")} value={ui.sus} onChange={(v) => patch({ sus: v })} />
                <RotaryKnob label={t("sfx.rls")} value={ui.rls} onChange={(v) => patch({ rls: v })} />
              </div>
            </section>

            <section className={`sfx-mod sfx-mod--fx ${ui.tremOn ? "" : "sfx-mod--off"}`}>
              <div className="sfx-mod__head">
                <h3>{t("sfx.modTremolo")}</h3>
                <label className="sfx-toggle">
                  <input
                    type="checkbox"
                    checked={ui.tremOn}
                    onChange={(e) => patch({ tremOn: e.target.checked })}
                  />
                  <span />
                </label>
              </div>
              <div className="sfx-knob-row sfx-knob-row--fx">
                <RotaryKnob size="sm" label={t("sfx.dpt")} value={ui.tremDpt} onChange={(v) => patch({ tremDpt: v })} />
                <RotaryKnob size="sm" label={t("sfx.ctr")} value={ui.tremCtr} onChange={(v) => patch({ tremCtr: v })} />
                <RotaryKnob size="sm" label={t("sfx.rate")} value={ui.tremRate} onChange={(v) => patch({ tremRate: v })} />
                <RotaryKnob size="sm" label={t("sfx.phs")} value={ui.tremPhs} onChange={(v) => patch({ tremPhs: v })} />
                <RotaryKnob size="sm" label={t("sfx.dly")} value={ui.tremDly} onChange={(v) => patch({ tremDly: v })} />
                <RotaryKnob size="sm" label={t("sfx.fade")} value={ui.tremFade} onChange={(v) => patch({ tremFade: v })} />
              </div>
            </section>

            <section className={`sfx-mod sfx-mod--fx ${ui.vibOn ? "" : "sfx-mod--off"}`}>
              <div className="sfx-mod__head">
                <h3>{t("sfx.modVibrato")}</h3>
                <label className="sfx-toggle">
                  <input
                    type="checkbox"
                    checked={ui.vibOn}
                    onChange={(e) => patch({ vibOn: e.target.checked })}
                  />
                  <span />
                </label>
              </div>
              <div className="sfx-knob-row sfx-knob-row--fx">
                <RotaryKnob size="sm" label={t("sfx.dpt")} value={ui.vibDpt} onChange={(v) => patch({ vibDpt: v })} />
                <RotaryKnob size="sm" label={t("sfx.ctr")} value={ui.vibCtr} onChange={(v) => patch({ vibCtr: v })} />
                <RotaryKnob size="sm" label={t("sfx.rate")} value={ui.vibRate} onChange={(v) => patch({ vibRate: v })} />
                <RotaryKnob size="sm" label={t("sfx.phs")} value={ui.vibPhs} onChange={(v) => patch({ vibPhs: v })} />
                <RotaryKnob size="sm" label={t("sfx.dly")} value={ui.vibDly} onChange={(v) => patch({ vibDly: v })} />
                <RotaryKnob size="sm" label={t("sfx.fade")} value={ui.vibFade} onChange={(v) => patch({ vibFade: v })} />
              </div>
            </section>

            <section className={`sfx-mod sfx-mod--fx sfx-mod--arp ${ui.arpOn ? "" : "sfx-mod--off"}`}>
              <div className="sfx-mod__head">
                <h3>{t("sfx.modArpeggio")}</h3>
                <label className="sfx-toggle">
                  <input
                    type="checkbox"
                    checked={ui.arpOn}
                    onChange={(e) => patch({ arpOn: e.target.checked })}
                  />
                  <span />
                </label>
              </div>
              <div className="sfx-knob-row sfx-knob-row--arp">
                <RotaryKnob
                  size="sm"
                  label={t("sfx.arp")}
                  value={ui.arpMod}
                  onChange={(v) => patch({ arpMod: v })}
                />
                <RotaryKnob
                  size="sm"
                  label={t("sfx.arpSpeed")}
                  value={ui.arpSpeed}
                  onChange={(v) => patch({ arpSpeed: v })}
                />
              </div>
            </section>
          </div>
        ) : (
          <>
            <div className="sfx-mod__head sfx-advanced__playrow">
              <button
                type="button"
                className="sfx-lab__btn sfx-lab__btn--primary"
                onClick={() => void triggerPlay()}
              >
                {loopEnabled
                  ? loopPlaying
                    ? t("sfx.stopLoop")
                    : t("sfx.startLoop")
                  : t("sfx.play")}
              </button>
            </div>
            <SfxAdvancedPanel
              params={advParams}
              t={t}
              onChange={(next) => setAdvParams(cloneParams(next))}
            />
          </>
        )}

        <section className="sfx-filebar">
          <button type="button" className="sfx-lab__chip sfx-lab__chip--accent" onClick={mutate}>
            {t("sfx.mutate")}
          </button>
          <button type="button" className="sfx-lab__chip" onClick={() => setShowPresets((v) => !v)}>
            {t("sfx.presetBtn")}
          </button>
          <button type="button" className="sfx-lab__chip" onClick={randomize}>
            {t("sfx.random")}
          </button>
          <button type="button" className="sfx-lab__chip" onClick={undo} disabled={!canUndo}>
            {t("sfx.undo")}
          </button>
          <button type="button" className="sfx-lab__chip" onClick={saveWav}>
            {t("sfx.save")}
          </button>
          <label className="sfx-lab__loop">
            <input
              type="checkbox"
              checked={loopEnabled}
              onChange={(e) => {
                const on = e.target.checked;
                setLoopEnabled(on);
                if (on) void startPlayback(currentLiveDef(), currentFx(), true);
              }}
            />
            <span>{t("sfx.loop")}</span>
          </label>
          <span className="sfx-lab__space-hint">{t("sfx.spaceHint")}</span>
        </section>

        {showPresets ? (
          <div className="sfx-lab__preset-row sfx-filebar__presets">
            {PRESETS.map((name) => (
              <button
                key={name}
                type="button"
                className="sfx-lab__chip"
                onClick={() => applyPreset(name)}
              >
                {t(`sfx.preset.${name}`)}
              </button>
            ))}
          </div>
        ) : null}

        <p className="sfx-lab__credit">
          {t("sfx.creditBefore")}{" "}
          <a href="https://github.com/chr15m/jsfxr" target="_blank" rel="noreferrer">
            jsfxr
          </a>{" "}
          {t("sfx.creditAfter")}
        </p>
      </div>
    </InnerPageLayout>
  );
}
