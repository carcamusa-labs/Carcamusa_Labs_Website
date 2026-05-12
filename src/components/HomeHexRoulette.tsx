import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface HexSection {
  to: string;
  label: string;
}

const SECTIONS: HexSection[] = [
  { to: "/1_about_carcamusa_labs.html", label: "1. About" },
  { to: "/2_cv_contact.html", label: "2. CV" },
  { to: "/3_projects.html", label: "3. Projects" },
  { to: "/4_artwork_assets.html", label: "4. Artwork" },
  { to: "/5_store.html", label: "5. Store" },
  { to: "/6_referrals_mentors.html", label: "6. Referrals" },
];

/** Idle spin rate (deg/s) around Y only; sign = direction */
const IDLE_RY_DEG_PER_SEC = -10;

/** Cumulative horizontal move (px) before we treat gesture as drag, not link tap */
const DRAG_SLOP_PX = 14;

/** rotY delta per pointer pixel (same as drag sensitivity) */
const DRAG_SPIN_GAIN = 0.45;

/** Extra angular velocity above idle (deg/s); decays after release */
const MOMENTUM_MAX_EXTRA_DPS = 320;

/** Time for extra spin to halve toward idle (seconds) */
const MOMENTUM_HALF_LIFE_SEC = 1.05;

/** Low-pass on measured finger spin rate (0–1), higher = snappier to last flick */
const VELOCITY_SMOOTH_ALPHA = 0.28;

export function HomeHexRoulette() {
  const [rotY, setRotY] = useState(12);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, px: 0, totalAbs: 0 });
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const suppressLinkClickRef = useRef(false);
  /** ω_extra: current spin = IDLE + excitement; decays exponentially */
  const excitementRef = useRef(0);
  const smoothedDragOmegaRef = useRef(0);
  const lastSampleRef = useRef({ t: 0, x: 0 });
  const hasVelocitySampleRef = useRef(false);

  const applyReleaseMomentum = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      excitementRef.current = 0;
      return;
    }
    if (drag.current.totalAbs > DRAG_SLOP_PX && hasVelocitySampleRef.current) {
      let extra = smoothedDragOmegaRef.current - IDLE_RY_DEG_PER_SEC;
      extra = Math.max(-MOMENTUM_MAX_EXTRA_DPS, Math.min(MOMENTUM_MAX_EXTRA_DPS, extra));
      excitementRef.current = extra;
    }
  }, []);

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    /* Capturing on the stage from a link target prevents the link click (mouse/pen).
       Touch still captures so face drags + tap-vs-slop work on mobile. */
    if ((e.target as HTMLElement).closest("a") && e.pointerType !== "touch") {
      /* Otherwise a prior touch drag can leave suppress true and block the first click. */
      suppressLinkClickRef.current = false;
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, px: e.clientX, totalAbs: 0 };
    suppressLinkClickRef.current = false;
    draggingRef.current = true;
    setDragging(true);
    excitementRef.current = 0;
    hasVelocitySampleRef.current = false;
    smoothedDragOmegaRef.current = IDLE_RY_DEG_PER_SEC;
    const t = performance.now();
    lastSampleRef.current = { t, x: e.clientX };
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.px;
    drag.current.px = e.clientX;
    drag.current.totalAbs += Math.abs(dx);
    if (drag.current.totalAbs > DRAG_SLOP_PX) {
      suppressLinkClickRef.current = true;
    }
    const t = performance.now();
    const dtRaw = (t - lastSampleRef.current.t) / 1000;
    if (dtRaw > 0 && dtRaw < 0.12 && dx !== 0) {
      const dtSec = Math.max(1 / 120, dtRaw);
      const dRot = dx * DRAG_SPIN_GAIN;
      const instOmega = dRot / dtSec;
      if (!hasVelocitySampleRef.current) {
        smoothedDragOmegaRef.current = instOmega;
        hasVelocitySampleRef.current = true;
      } else {
        const a = VELOCITY_SMOOTH_ALPHA;
        smoothedDragOmegaRef.current =
          smoothedDragOmegaRef.current * (1 - a) + instOmega * a;
      }
    }
    lastSampleRef.current = { t, x: e.clientX };
    setRotY((y) => y + dx * DRAG_SPIN_GAIN);
  }, []);

  const endDrag = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    applyReleaseMomentum();
    drag.current.active = false;
    draggingRef.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  }, [applyReleaseMomentum]);

  const onLostPointerCapture = useCallback(() => {
    if (drag.current.active) {
      applyReleaseMomentum();
    }
    drag.current.active = false;
    draggingRef.current = false;
    setDragging(false);
  }, [applyReleaseMomentum]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rafRef = { id: 0 };
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (mq.matches) {
        excitementRef.current = 0;
      } else if (!hoveredRef.current && !draggingRef.current) {
        const omega = IDLE_RY_DEG_PER_SEC + excitementRef.current;
        setRotY((y) => y + omega * dt);
        excitementRef.current *= Math.pow(0.5, dt / MOMENTUM_HALF_LIFE_SEC);
      }
      rafRef.id = requestAnimationFrame(tick);
    };
    rafRef.id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.id);
  }, []);

  return (
    <nav className="hex-bolt-scene" aria-label="Site sections">
      <div
        className={`hex-bolt-stage${dragging ? " hex-bolt-stage--dragging" : ""}`}
        onPointerEnter={() => {
          hoveredRef.current = true;
        }}
        onPointerLeave={() => {
          hoveredRef.current = false;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={onLostPointerCapture}
      >
        <div className="hex-bolt-tilt">
          <div className="hex-bolt-tilt-stack">
            <div className="hex-bolt-y-axis" aria-hidden />
            <div className="hex-bolt-drum" style={{ transform: `rotateY(${rotY}deg)` }}>
              {SECTIONS.map((section, i) => (
                <div
                  key={section.to}
                  className="hex-bolt-face"
                  style={{
                    transform: `rotateY(${i * 60}deg) translateZ(var(--hex-r))`,
                  }}
                >
                  <div className="hex-bolt-panel" aria-hidden />
                  <Link
                    to={section.to}
                    className="hex-bolt-link"
                    onClick={(ev) => {
                      if (suppressLinkClickRef.current) {
                        ev.preventDefault();
                        suppressLinkClickRef.current = false;
                      }
                    }}
                  >
                    {section.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
