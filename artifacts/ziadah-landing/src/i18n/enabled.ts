import { LOCALES, type Locale } from "./languages";

/**
 * The languages that are live: Arabic and English always, plus every language
 * that has a catalogue file in `catalog/`. A language is switched on by adding
 * its file, and not before, so the switcher, the `hreflang` set and the
 * sitemap never advertise a page that would still read as English.
 */
const files = import.meta.glob("./catalog/*.json");
const withCatalog = new Set(Object.keys(files).map((f) => f.replace("./catalog/", "").replace(".json", "")));

export const ENABLED_LOCALES: readonly Locale[] = LOCALES.filter(
  (l) => l === "ar" || l === "en" || withCatalog.has(l),
);
