import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Props = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  /** Mouse-wheel step while hovered (default 0.01). */
  wheelStep?: number;
  /** Compact dial for side FX modules. */
  size?: "md" | "sm";
  onChange: (v: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function valueToAngle(value: number, min: number, max: number) {
  const t = (value - min) / (max - min || 1);
  return -135 + t * 270;
}

export function RotaryKnob({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  wheelStep = 0.01,
  size = "md",
  onChange,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastY = useRef(0);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  valueRef.current = value;
  onChangeRef.current = onChange;

  const commit = useCallback(
    (raw: number, quantize = step) => {
      const stepped = Math.round(raw / quantize) * quantize;
      onChangeRef.current(clamp(Number(stepped.toFixed(4)), min, max));
    },
    [max, min, step],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      /* Prefer horizontal intent when present; else vertical scroll. */
      const dominant =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (dominant === 0) return;
      /* Scroll up / swipe right → increase (turn “right”). */
      const dir = dominant < 0 ? 1 : -1;
      commit(valueRef.current + dir * wheelStep, wheelStep);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [commit, wheelStep]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragging.current = true;
    lastY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dy = lastY.current - e.clientY;
    lastY.current = e.clientY;
    const range = max - min;
    commit(valueRef.current + dy * range * 0.008);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* */
    }
  };

  const angle = valueToAngle(value, min, max);

  return (
    <div
      className={
        size === "sm"
          ? "sfx-knob sfx-knob--rotary sfx-knob--sm"
          : "sfx-knob sfx-knob--rotary"
      }
      ref={rootRef}
    >
      <em>{value.toFixed(2)}</em>
      <div
        className="sfx-knob__dial"
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Number(value.toFixed(2))}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault();
            commit(value + wheelStep, wheelStep);
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault();
            commit(value - wheelStep, wheelStep);
          }
        }}
      >
        <div className="sfx-knob__face" style={{ transform: `rotate(${angle}deg)` }}>
          <i className="sfx-knob__pointer" />
        </div>
      </div>
      <span>{label}</span>
    </div>
  );
}
