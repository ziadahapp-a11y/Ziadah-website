import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";

const THEME_ORDER: Theme[] = ["light", "dark"];

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

function isTheme(v: string | null): v is Theme {
  return v === "dark" || v === "light";
}

function readThemeFromUrl(): Theme | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    return isTheme(mode) ? mode : null;
  } catch {
    return null;
  }
}

function setThemeInUrl(next: Theme, method: "push" | "replace" = "push") {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const curUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl === curUrl) return;
    if (method === "replace") window.history.replaceState(null, "", nextUrl);
    else window.history.pushState(null, "", nextUrl);
  } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const fromUrl = readThemeFromUrl();
    if (fromUrl) return fromUrl;
    try {
      const saved = localStorage.getItem("zd-theme");
      if (saved === "red") return "light";
      if (isTheme(saved)) return saved;
    } catch {}
    return "light";
  });

  const setTheme = useMemo(
    () => (t: Theme) => {
      setThemeState(t);
      setThemeInUrl(t, "push");
    },
    [],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("zd-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const i = THEME_ORDER.indexOf(prev);
      const next = THEME_ORDER[(i + 1) % THEME_ORDER.length];
      setThemeInUrl(next, "push");
      return next;
    });
  };

  useEffect(() => {
    const syncThemeFromUrl = () => {
      const fromUrl = readThemeFromUrl();
      if (fromUrl) setThemeState(fromUrl);
    };
    window.addEventListener("popstate", syncThemeFromUrl);
    return () => window.removeEventListener("popstate", syncThemeFromUrl);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
