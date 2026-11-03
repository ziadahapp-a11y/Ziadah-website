/**
 * Every language the site is served in.
 *
 * `ar` is the default and has no URL prefix; every other language lives under
 * `/<code>/...`. Arabic and English are authored by hand in the source; the
 * other fifteen are served from a translation catalogue (see `catalog.ts`)
 * that is keyed by the English string, so a string without a translation
 * falls back to English instead of breaking a page.
 */
export const LOCALES = [
  "ar", "en", "fr", "de", "es", "it", "pt", "nl", "sv", "da", "no", "pl", "tr", "ja", "ko", "zh", "zh-tw",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ar";

/** The name each language is written in, for the language menu. */
export const LOCALE_NAMES: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  sv: "Svenska",
  da: "Dansk",
  no: "Norsk",
  pl: "Polski",
  tr: "Türkçe",
  ja: "日本語",
  ko: "한국어",
  zh: "简体中文",
  "zh-tw": "繁體中文",
};

/** BCP 47 tag for `<html lang>`, `hreflang` and `og:locale`. */
export const LOCALE_TAGS: Record<Locale, string> = {
  ar: "ar", en: "en", fr: "fr", de: "de", es: "es", it: "it", pt: "pt", nl: "nl", sv: "sv", da: "da",
  no: "nb", pl: "pl", tr: "tr", ja: "ja", ko: "ko", zh: "zh-Hans", "zh-tw": "zh-Hant",
};

export const OG_LOCALES: Record<Locale, string> = {
  ar: "ar_SA", en: "en_US", fr: "fr_FR", de: "de_DE", es: "es_ES", it: "it_IT", pt: "pt_BR", nl: "nl_NL",
  sv: "sv_SE", da: "da_DK", no: "nb_NO", pl: "pl_PL", tr: "tr_TR", ja: "ja_JP", ko: "ko_KR",
  zh: "zh_CN", "zh-tw": "zh_TW",
};

export const isLocale = (v: string | null | undefined): v is Locale =>
  !!v && (LOCALES as readonly string[]).includes(v);

/** Only Arabic is written right to left. */
export const localeDir = (l: Locale): "rtl" | "ltr" => (l === "ar" ? "rtl" : "ltr");

/**
 * The language a URL is in: the first path segment when it is a language
 * code, otherwise Arabic. `/en/pricing` -> en, `/pricing` -> ar.
 */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}

/** The path without its language prefix: `/fr/pricing` -> `/pricing`, `/fr` -> `/`. */
export function stripLocalePrefix(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (isLocale(seg) && seg !== DEFAULT_LOCALE) {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

/** `/pricing` + fr -> `/fr/pricing`; Arabic stays unprefixed. */
export function withLocalePrefix(path: string, locale: Locale): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return p;
  return p === "/" ? `/${locale}` : `/${locale}${p}`;
}
