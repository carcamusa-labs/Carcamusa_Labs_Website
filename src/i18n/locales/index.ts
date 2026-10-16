import type { TranslationDictionary } from "../types";
import { en } from "./en";
import { es } from "./es";
import { ja } from "./ja";
import { pl } from "./pl";
import { pt } from "./pt";

export const locales: Record<"en" | "es" | "pt" | "pl" | "ja", TranslationDictionary> = {
  en,
  es,
  pt,
  pl,
  ja,
};

export { en, es, pt, pl, ja };
