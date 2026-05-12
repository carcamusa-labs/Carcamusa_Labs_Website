/** Absolute URL from site root (works with Vite base and GitHub Pages). */
export function assetUrl(pathFromRoot: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = pathFromRoot.startsWith("/") ? pathFromRoot : `/${pathFromRoot}`;
  if (!base || base === "/") return normalized;
  return `${base.replace(/\/$/, "")}${normalized}`;
}
