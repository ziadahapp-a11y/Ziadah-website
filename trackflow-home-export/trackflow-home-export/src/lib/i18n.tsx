import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "ar" | "en";

export const SUPPORTED_LANGS: Lang[] = ["ar", "en"];
const DEFAULT_LANG: Lang = "ar";
const STORAGE_KEY = "rased-lang";

// Deployment base path without trailing slash (usually ""), e.g. "" or "/app".
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Strip the deployment base from a pathname, always returning a leading "/". */
function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || "/";
  return pathname || "/";
}

/** Read the language segment from a pathname, or null if it has no prefix. */
function langFromPath(pathname: string): Lang | null {
  const seg = stripBase(pathname).split("/").filter(Boolean)[0];
  return seg === "ar" || seg === "en" ? (seg as Lang) : null;
}

/** The path segments after the language prefix, e.g. ["features", "x"]. */
function restSegments(pathname: string): string[] {
  return stripBase(pathname).split("/").filter(Boolean).slice(1);
}

/** Language saved from a previous visit, falling back to the default. */
function preferredLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "ar" ? saved : DEFAULT_LANG;
}

/** Build a full URL for a language + the current location's rest/search/hash. */
function buildUrl(lang: Lang, rest: string[]): string {
  const tail = rest.length ? `/${rest.join("/")}` : "";
  return `${BASE}/${lang}${tail}${window.location.search}${window.location.hash}`;
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "rtl" | "ltr";
};

const LanguageContext = createContext<Ctx>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  dir: "rtl",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The URL is the source of truth for language. On first load we read the
  // /ar or /en prefix; legacy unprefixed URLs are rewritten to the preferred
  // language before anything renders so the router always sees a prefix.
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    const fromPath = langFromPath(window.location.pathname);
    if (fromPath) return fromPath;
    const next = preferredLang();
    window.history.replaceState(null, "", buildUrl(next, restSegments(window.location.pathname)));
    return next;
  });

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  // Keep state in sync when the user navigates back/forward across languages.
  useEffect(() => {
    const onPopState = () => {
      const fromPath = langFromPath(window.location.pathname);
      if (fromPath && fromPath !== lang) setLangState(fromPath);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    if (l === lang) return;
    // Swap the language segment in place, preserving the rest of the route.
    window.history.pushState(null, "", buildUrl(l, restSegments(window.location.pathname)));
    setLangState(l);
  };

  return <LanguageContext.Provider value={{ lang, setLang, dir }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

/**
 * Pick value by language. Pass either an object { ar, en } or use the
 * `pickT()` helper below for nested dictionaries.
 */
export function useT() {
  const { lang } = useLang();
  return function t<T>(values: { ar: T; en: T }): T {
    return values[lang];
  };
}
