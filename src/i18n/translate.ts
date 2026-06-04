import type { TranslationDictionary } from "./types";

export function getByPath(dict: TranslationDictionary, path: string): string {
  const keys = path.split(".");
  let cur: unknown = dict;
  for (const key of keys) {
    if (cur && typeof cur === "object" && key in cur) {
      cur = (cur as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}
