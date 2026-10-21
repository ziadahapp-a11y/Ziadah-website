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

/**
 * The social preview image for a page, one per route and language, written at
 * build time by `scripts/prerender.mjs` (`ogFile`): keep the two in step.
 * `/` is `/og/index.png`; `/en` is `/og/en.png`; `/en/sectors/gold` is
 * `/og/en/sectors/gold.png`.
 */
/**
 * Link-preview caches (Slack, WhatsApp, X, LinkedIn) key the image on its URL,
 * so a card that was ever wrong stays wrong for as long as the URL is the same.
 * Raise this whenever the cards change; the files themselves do not move.
 * v2: the Arabic cards of v1 were blank.
 * v3: the cards were drawn in a fallback font; now Rubik.
 */
export const OG_VERSION = "3";

export function ogImagePath(path: string, lang: "ar" | "en"): string {
  const served = pathWithLang(path, lang);
  const file = served === "/" ? "/og/index.png" : `/og${served.replace(/\/$/, "")}.png`;
  return `${file}?v=${OG_VERSION}`;
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
