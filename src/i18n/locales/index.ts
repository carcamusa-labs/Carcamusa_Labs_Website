import type { TranslationDictionary } from "../types";
import { en } from "./en";
import { es } from "./es";
import { it } from "./it";
import { ja } from "./ja";
import { pl } from "./pl";
import { pt } from "./pt";

export const locales: Record<"en" | "es" | "pt" | "pl" | "ja" | "it", TranslationDictionary> = {
  en,
  es,
  pt,
  pl,
  it,
  ja,
};

export { en, es, pt, pl, it, ja };
