import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_ORDER: Theme[] = ["dark", "light"];

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

function isTheme(v: string | null): v is Theme {
  return v === "dark" || v === "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("zd-theme");
      if (saved === "red") return "dark";
      if (isTheme(saved)) return saved;
    } catch {}
    return "dark";
  });

  const setTheme = (t: Theme) => setThemeState(t);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("zd-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const i = THEME_ORDER.indexOf(prev);
      return THEME_ORDER[(i + 1) % THEME_ORDER.length];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
