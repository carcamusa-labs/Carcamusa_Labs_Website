import type { SfxSynthDef } from "../lib/sfxr";

const WAVEFORMS = [
  { id: 0, key: "square" as const, glyph: "⊓" },
  { id: 1, key: "saw" as const, glyph: "╱" },
  { id: 2, key: "sine" as const, glyph: "∿" },
  { id: 4, key: "triangle" as const, glyph: "△" },
  { id: 3, key: "noise" as const, glyph: "▦" },
] as const;

type SliderDef = {
  key: keyof SfxSynthDef & string;
  labelKey: string;
  min: number;
  max: number;
  step: number;
};

const GROUPS: { titleKey: string; sliders: SliderDef[] }[] = [
  {
    titleKey: "sfx.groupEnvelope",
    sliders: [
      { key: "p_env_attack", labelKey: "sfx.attack", min: 0, max: 1, step: 0.01 },
      { key: "p_env_sustain", labelKey: "sfx.sustain", min: 0, max: 1, step: 0.01 },
      { key: "p_env_punch", labelKey: "sfx.punch", min: 0, max: 1, step: 0.01 },
      { key: "p_env_decay", labelKey: "sfx.decay", min: 0, max: 1, step: 0.01 },
    ],
  },
  {
    titleKey: "sfx.groupTone",
    sliders: [
      { key: "p_base_freq", labelKey: "sfx.freq", min: 0, max: 1, step: 0.01 },
      { key: "p_freq_limit", labelKey: "sfx.freqLimit", min: 0, max: 1, step: 0.01 },
      { key: "p_freq_ramp", labelKey: "sfx.slide", min: -1, max: 1, step: 0.01 },
      { key: "p_freq_dramp", labelKey: "sfx.deltaSlide", min: -1, max: 1, step: 0.01 },
      { key: "p_duty", labelKey: "sfx.duty", min: 0, max: 1, step: 0.01 },
      { key: "p_duty_ramp", labelKey: "sfx.dutySweep", min: -1, max: 1, step: 0.01 },
    ],
  },
  {
    titleKey: "sfx.groupVibArp",
    sliders: [
      { key: "p_vib_strength", labelKey: "sfx.vibrato", min: 0, max: 1, step: 0.01 },
      { key: "p_vib_speed", labelKey: "sfx.vibratoSpeed", min: 0, max: 1, step: 0.01 },
      { key: "p_arp_mod", labelKey: "sfx.arpMod", min: -1, max: 1, step: 0.01 },
      { key: "p_arp_speed", labelKey: "sfx.arpSpeedLong", min: 0, max: 1, step: 0.01 },
      { key: "p_repeat_speed", labelKey: "sfx.repeat", min: 0, max: 1, step: 0.01 },
    ],
  },
  {
    titleKey: "sfx.groupFx",
    sliders: [
      { key: "p_pha_offset", labelKey: "sfx.flanger", min: -1, max: 1, step: 0.01 },
      { key: "p_pha_ramp", labelKey: "sfx.flangerSweep", min: -1, max: 1, step: 0.01 },
      { key: "p_lpf_freq", labelKey: "sfx.lpf", min: 0, max: 1, step: 0.01 },
      { key: "p_lpf_resonance", labelKey: "sfx.lpfRes", min: 0, max: 1, step: 0.01 },
      { key: "p_lpf_ramp", labelKey: "sfx.lpfSweep", min: -1, max: 1, step: 0.01 },
      { key: "p_hpf_freq", labelKey: "sfx.hpf", min: 0, max: 1, step: 0.01 },
      { key: "p_hpf_ramp", labelKey: "sfx.hpfSweep", min: -1, max: 1, step: 0.01 },
    ],
  },
];

export function SfxAdvancedPanel({
  params,
  t,
  onChange,
}: {
  params: SfxSynthDef;
  t: (key: string) => string;
  onChange: (next: SfxSynthDef) => void;
}) {
  const setKey = (key: string, value: number) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <div className="sfx-advanced">
      <section className="sfx-mod">
        <div className="sfx-mod__head">
          <h3>{t("sfx.waveform")}</h3>
        </div>
        <div className="sfx-lab__wave-row sfx-mod__waves">
          {WAVEFORMS.map((w) => (
            <button
              key={w.id}
              type="button"
              className={
                Number(params.wave_type) === w.id
                  ? "sfx-lab__chip sfx-lab__chip--active"
                  : "sfx-lab__chip"
              }
              onClick={() => setKey("wave_type", w.id)}
            >
              <span className="sfx-wave-glyph" aria-hidden="true">
                {w.glyph}
              </span>
              {t(`sfx.wave.${w.key}`)}
            </button>
          ))}
        </div>
        <div className="sfx-adv-quality">
          <label className="sfx-lab__select-label">
            <span>{t("sfx.bitDepth")}</span>
            <select
              value={Number(params.sample_size) || 8}
              onChange={(e) => setKey("sample_size", Number(e.target.value))}
            >
              <option value={8}>8-bit</option>
              <option value={16}>16-bit</option>
            </select>
          </label>
          <label className="sfx-lab__select-label">
            <span>{t("sfx.sampleRate")}</span>
            <select
              value={Number(params.sample_rate) || 44100}
              onChange={(e) => setKey("sample_rate", Number(e.target.value))}
            >
              <option value={44100}>44100</option>
              <option value={22050}>22050</option>
              <option value={11025}>11025</option>
              <option value={5512}>5512</option>
            </select>
          </label>
          <label className="sfx-lab__slider">
            <span>
              {t("sfx.volume")}{" "}
              <em>{Number(params.sound_vol ?? 0.35).toFixed(2)}</em>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={Number(params.sound_vol ?? 0.35)}
              onChange={(e) => setKey("sound_vol", Number(e.target.value))}
            />
          </label>
        </div>
      </section>

      {GROUPS.map((group) => (
        <section key={group.titleKey} className="sfx-mod">
          <div className="sfx-mod__head">
            <h3>{t(group.titleKey)}</h3>
          </div>
          <div className="sfx-adv-sliders">
            {group.sliders.map((s) => {
              const val = Number(params[s.key] ?? 0);
              return (
                <label key={s.key} className="sfx-lab__slider">
                  <span>
                    {t(s.labelKey)} <em>{val.toFixed(2)}</em>
                  </span>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={val}
                    onChange={(e) => setKey(s.key, Number(e.target.value))}
                  />
                </label>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
