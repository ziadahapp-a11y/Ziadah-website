import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  DEFAULT_LOCALE, LOCALE_TAGS, localeDir, localeFromPath, stripLocalePrefix, withLocalePrefix, type Locale,
} from "./languages";

export type { Locale } from "./languages";

/**
 * `lang` is the language the hand-written source speaks: "ar" or "en".
 * Every locale that is not Arabic reads as "en" here, so the ~3,000 existing
 * `lang === "ar" ? ... : ...` branches keep working unchanged, and `locale`
 * says which language is actually being shown. The catalogue then translates
 * the English the source produced (see `jsx-runtime`).
 */
export type Lang = "ar" | "en";

interface LanguageContextType {
  lang: Lang;
  locale: Locale;
  /** Accepts "ar" | "en" as before, or any other site language. */
  setLang: (lang: Locale) => void;
  dir: "rtl" | "ltr";
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  locale: DEFAULT_LOCALE,
  setLang: () => {},
  dir: "rtl",
  isAr: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => localeFromPath(window.location.pathname));

  const lang: Lang = locale === "ar" ? "ar" : "en";
  const dir = localeDir(locale);

  const setLang = (next: Locale) => {
    /* A catalogue language is loaded once, before render, so switching into or
       out of one is a page load; ar <-> en stays a soft switch. */
    const builtIn = (l: Locale) => l === "ar" || l === "en";
    if (!builtIn(next) || !builtIn(locale)) {
      try { localStorage.setItem("ziadah_lang", next); } catch {}
      const target = withLocalePrefix(stripLocalePrefix(window.location.pathname), next);
      window.location.assign(`${target}${window.location.search}${window.location.hash}`);
      return;
    }
    setLocale(next);
    try { localStorage.setItem("ziadah_lang", next); } catch {}

    const basePath = stripLocalePrefix(window.location.pathname);
    const nextPath = withLocalePrefix(basePath, next);
    const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    // pushState يكفي: wouter يربط التحديث عبر حدث pushState بعد patch على history (لا نُركّب popstate يدوياً)
    if (nextUrl !== currentUrl) {
      window.history.pushState({}, "", nextUrl);
    }
  };

  useEffect(() => {
    document.documentElement.lang = LOCALE_TAGS[locale];
    document.documentElement.dir = dir;
    document.body.dir = dir;
    document.documentElement.dataset.locale = locale;
  }, [locale, dir]);

  useEffect(() => {
    const syncLangFromUrl = () => {
      const next = localeFromPath(window.location.pathname);
      setLocale(next);
      try { localStorage.setItem("ziadah_lang", next); } catch {}
    };
    window.addEventListener("popstate", syncLangFromUrl);
    return () => window.removeEventListener("popstate", syncLangFromUrl);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, locale, setLang, dir, isAr: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
