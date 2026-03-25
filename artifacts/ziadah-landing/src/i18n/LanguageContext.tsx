import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "ar" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "rtl" | "ltr";
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  dir: "rtl",
  isAr: true,
});

function pathnameHasEnPrefix(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/");
}

function stripEnPrefix(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return pathnameHasEnPrefix(window.location.pathname) ? "en" : "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem("ziadah_lang", newLang); } catch {}

    const currentPath = window.location.pathname;
    const basePath = stripEnPrefix(currentPath);
    const nextPath = newLang === "en"
      ? (basePath === "/" ? "/en" : `/en${basePath}`)
      : basePath;

    const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    // pushState يكفي: wouter يربط التحديث عبر حدث pushState بعد patch على history (لا نُركّب popstate يدوياً)
    if (nextUrl !== currentUrl) {
      window.history.pushState({}, "", nextUrl);
    }
  };

  useEffect(() => {
    // أرقام لاتينية (0–9) مع واجهة عربية — بدل أرقام هندية شرقية في العرض
    document.documentElement.lang = lang === "ar" ? "ar-SA-u-nu-latn" : "en";
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    const syncLangFromUrl = () => {
      const nextLang: Lang = pathnameHasEnPrefix(window.location.pathname) ? "en" : "ar";
      setLangState(nextLang);
      try { localStorage.setItem("ziadah_lang", nextLang); } catch {}
    };

    window.addEventListener("popstate", syncLangFromUrl);
    return () => window.removeEventListener("popstate", syncLangFromUrl);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, isAr: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
