import { useEffect, useRef } from "react";
import { sfxr, type SfxSynthDef } from "../lib/sfxr";

function getNormalizedSamples(def: SfxSynthDef): Float32Array | null {
  try {
    const wave = sfxr.toWave(def) as { buffer?: number[] };
    const buf = wave.buffer;
    if (!buf || buf.length === 0) return null;
    return Float32Array.from(buf);
  } catch {
    return null;
  }
}

function peakAbs(samples: Float32Array, start: number, end: number) {
  let peak = 0.001;
  for (let i = start; i < end; i++) {
    const a = Math.abs(samples[i]);
    if (a > peak) peak = a;
  }
  return peak;
}

function paintWave(
  canvas: HTMLCanvasElement,
  samples: Float32Array,
  opts: {
    stroke: string;
    fillGrid: string;
    mid: string;
    /** Same buffer, same amplitude scale — zoom only crops time from the start. */
    zoom?: boolean;
    globalPeak: number;
  },
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = canvas.clientWidth || 640;
  const cssH = canvas.clientHeight || 120;
  const w = Math.max(1, Math.floor(cssW * dpr));
  const h = Math.max(1, Math.floor(cssH * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = opts.fillGrid;
  ctx.lineWidth = dpr;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, h * 0.25);
  ctx.lineTo(w, h * 0.25);
  ctx.moveTo(0, h * 0.75);
  ctx.lineTo(w, h * 0.75);
  ctx.stroke();

  const len = samples.length;
  if (len < 2) return;

  /* Zoom = left portion of the SAME wave (matches the left side of Full). */
  const start = 0;
  const end = opts.zoom
    ? Math.max(2, Math.min(len, Math.max(384, Math.floor(len * 0.18))))
    : len;

  const n = end - start;
  const amp = (h * 0.42) / opts.globalPeak;

  ctx.strokeStyle = opts.stroke;
  ctx.lineWidth = Math.max(1.25 * dpr, dpr);
  ctx.lineJoin = "round";
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const i = start + Math.min(n - 1, Math.floor((x / (w - 1)) * (n - 1)));
    const y = h / 2 - samples[i] * amp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.lineTo(w, h / 2);
  ctx.lineTo(0, h / 2);
  ctx.closePath();
  ctx.fillStyle = opts.mid;
  ctx.globalAlpha = 0.18;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawBoth(
  full: HTMLCanvasElement | null,
  detail: HTMLCanvasElement | null,
  samples: Float32Array,
) {
  const globalPeak = peakAbs(samples, 0, samples.length);
  if (full) {
    paintWave(full, samples, {
      stroke: "cyan",
      fillGrid: "rgba(0, 255, 255, 0.18)",
      mid: "cyan",
      zoom: false,
      globalPeak,
    });
  }
  if (detail) {
    paintWave(detail, samples, {
      stroke: "color(display-p3 1 0.784 0.2)",
      fillGrid: "rgba(255, 200, 50, 0.15)",
      mid: "color(display-p3 1 0.784 0.2)",
      zoom: true,
      globalPeak,
    });
  }
}

export function SfxWaveScope({
  params,
  fullLabel,
  detailLabel,
}: {
  params: SfxSynthDef;
  fullLabel: string;
  detailLabel: string;
}) {
  const fullRef = useRef<HTMLCanvasElement>(null);
  const detailRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);
  const paramsRef = useRef(params);
  paramsRef.current = params;

  const paintNow = () => {
    const samples = getNormalizedSamples(paramsRef.current);
    if (!samples) return;
    drawBoth(fullRef.current, detailRef.current, samples);
  };

  useEffect(() => {
    /* Live while dragging knobs — next frame, no wait-for-release debounce. */
    if (raf.current != null) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      paintNow();
    });
    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [params]);

  useEffect(() => {
    const onResize = () => paintNow();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="sfx-lab__scope" aria-label={fullLabel}>
      <div className="sfx-lab__scope-block">
        <h3 className="sfx-lab__section-title">{fullLabel}</h3>
        <canvas ref={fullRef} className="sfx-lab__scope-canvas" role="img" aria-label={fullLabel} />
      </div>
      <div className="sfx-lab__scope-block">
        <h3 className="sfx-lab__section-title">{detailLabel}</h3>
        <canvas
          ref={detailRef}
          className="sfx-lab__scope-canvas sfx-lab__scope-canvas--detail"
          role="img"
          aria-label={detailLabel}
        />
      </div>
    </section>
  );
}
