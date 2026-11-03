import { DEFAULT_LOCALE, type Locale } from "./languages";

/**
 * The translation catalogue for every language except Arabic and English.
 *
 * KEYED BY THE ENGLISH STRING. The source of the site is written in Arabic and
 * English by hand; for the other fifteen languages the page is rendered from
 * its English text and each string is replaced by its translation on the way
 * to the DOM (see `jsx/`). A string with no entry stays English, so a missing
 * translation is a visible gap, never a broken page.
 *
 * Keys are whitespace-normalised. Leading and trailing whitespace of the
 * original is kept on the output so inline fragments still join up.
 */
type Catalog = Record<string, string>;

const loaders = import.meta.glob<{ default: Catalog }>("./catalog/*.json");
const loaded: Partial<Record<Locale, Catalog>> = {};
let active: Locale = DEFAULT_LOCALE;

const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const LATIN = /[A-Za-z]{2}/;

/** Strings the page asked for that the catalogue does not have (collection mode, English run). */
export const seen: Set<string> = new Set();
let collecting = false;
export const setCollecting = (v: boolean) => { collecting = v; };

export async function loadCatalog(locale: Locale): Promise<void> {
  active = locale;
  if (locale === "ar" || locale === "en" || loaded[locale]) return;
  const load = loaders[`./catalog/${locale}.json`];
  loaded[locale] = load ? (await load()).default : {};
}

export const activeLocale = () => active;
export const setActiveLocale = (l: Locale) => { active = l; };

export function tr(text: string, locale: Locale = active): string {
  if (typeof text !== "string" || text.length === 0) return text;
  if (locale === "ar") return text;
  const key = norm(text);
  if (key.length === 0) return text;
  if (locale === "en") {
    if (collecting && LATIN.test(key)) seen.add(key);
    return text;
  }
  const hit = loaded[locale]?.[key];
  if (hit === undefined) {
    if (collecting && LATIN.test(key)) seen.add(key);
    return text;
  }
  const lead = text.match(/^\s*/)![0];
  const trail = text.match(/\s*$/)![0];
  return `${lead}${hit}${trail}`;
}
