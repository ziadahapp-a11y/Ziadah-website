export const SITE_URL = "https://www.ziadah.app";
export const SITE_NAME = "Ziadah";

/** Locale-prefixed path as served by the app (/en for English). */
export function pathWithLang(path: string, lang: "ar" | "en"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === "ar") return p;
  return p === "/" ? "/en" : `/en${p}`;
}

export function absolutePageUrl(path: string, lang: "ar" | "en"): string {
  return `${SITE_URL}${pathWithLang(path, lang)}`;
}

/** Max length for `<title>` (full string including brand if present). */
export function clampMetaTitle(text: string, max = 60): string {
  const t = text.trim();
  if (t.length <= max) return t;
  if (max <= 1) return "…";
  const slice = t.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > Math.floor(max * 0.45) ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
}

export function clampMetaDescription(text: string, max = 160): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  if (max <= 1) return "…";
  const slice = t.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > Math.floor(max * 0.45) ? slice.slice(0, lastSpace) : slice;
  return `${cut.trimEnd()}…`;
}
