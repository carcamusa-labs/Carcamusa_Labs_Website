import { useEffect, useState } from "react";

/** Matches `(max-width: 768px)` — same breakpoint as mobile CSS. */
export function useIsMobile768() {
  const query = "(max-width: 768px)";
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    m.addEventListener("change", onChange);
    setMatches(m.matches);
    return () => m.removeEventListener("change", onChange);
  }, []);

  return matches;
}
