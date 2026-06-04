import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { locales } from "./locales";
import { getByPath } from "./translate";
import { LOCALES, STORAGE_KEY, type Locale, type TranslationDictionary } from "./types";

function readStoredLocale(): Locale {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es" || stored === "pt" || stored === "pl" || stored === "ja" || stored === "it") {
      return stored;
    }
  } catch {
    /* sessionStorage unavailable */
  }
  return "en";
}

function htmlLangFor(locale: Locale): string {
  return LOCALES.find((l) => l.code === locale)?.htmlLang ?? locale;
}

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dict: TranslationDictionary;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* sessionStorage unavailable */
    }
    setLocaleState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLangFor(locale);
  }, [locale]);

  const dict = locales[locale];

  const t = useCallback((key: string) => getByPath(dict, key), [dict]);

  const value = useMemo(() => ({ locale, setLocale, t, dict }), [locale, setLocale, t, dict]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
