import type { en } from "./locales/en";

export type Locale = "en" | "es" | "pt" | "pl" | "ja" | "it";

export type TranslationDictionary = typeof en;

export const LOCALES: { code: Locale; display: string; label: string; htmlLang: string }[] = [
  { code: "en", display: "EN", label: "English", htmlLang: "en" },
  { code: "es", display: "ES", label: "Español", htmlLang: "es" },
  { code: "pt", display: "PT", label: "Português", htmlLang: "pt-PT" },
  { code: "pl", display: "PL", label: "Polski", htmlLang: "pl" },
  { code: "it", display: "IT", label: "Italiano", htmlLang: "it" },
  { code: "ja", display: "JA", label: "日本語", htmlLang: "ja" },
];

export const STORAGE_KEY = "carcamusa_lang";
