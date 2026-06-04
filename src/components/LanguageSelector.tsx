import { useEffect, useRef, useState } from "react";
import { LOCALES } from "../i18n/types";
import { useTranslation } from "../i18n/useTranslation";

export function LanguageSelector({ langLinkId }: { langLinkId?: string } = {}) {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const current = LOCALES.find((l) => l.code === locale);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onTriggerClick = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setOpen((prev) => !prev);
    }
  };

  const pickLocale = (code: (typeof LOCALES)[number]["code"]) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <nav
      ref={rootRef}
      className={`menu lang-selector${open ? " lang-selector--open" : ""}`}
      aria-label={t("header.chooseLanguage")}
    >
      <ul>
        <li className="lang-selector__root">
          <button
            type="button"
            className="lang-trigger"
            id={langLinkId}
            onClick={onTriggerClick}
            aria-expanded={open}
            aria-haspopup="true"
          >
            {current?.display ?? t("header.langToggle")}
          </button>
          <ul className="lang-selector__panel">
            {LOCALES.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  className={`lang-option${locale === item.code ? " lang-option--active" : ""}`}
                  onClick={() => pickLocale(item.code)}
                  aria-label={item.label}
                  aria-current={locale === item.code ? "true" : undefined}
                >
                  {item.display}
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
