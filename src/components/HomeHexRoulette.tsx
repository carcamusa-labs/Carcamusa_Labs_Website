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

export function HomeHexRoulette() {
  const [rotY, setRotY] = useState(12);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, px: 0 });
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, px: e.clientX };
    draggingRef.current = true;
    setDragging(true);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.px;
    drag.current.px = e.clientX;
    setRotY((y) => y + dx * 0.45);
  }, []);

  const endDrag = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    draggingRef.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  }, []);

  const onLostPointerCapture = useCallback(() => {
    drag.current.active = false;
    draggingRef.current = false;
    setDragging(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rafRef = { id: 0 };
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!mq.matches && !hoveredRef.current && !draggingRef.current) {
        setRotY((y) => y + IDLE_RY_DEG_PER_SEC * dt);
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
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
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
                  <Link to={section.to} className="hex-bolt-link">
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
