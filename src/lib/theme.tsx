import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
    return "dark";
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
  };

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const update = () => {
      const resolved = theme === "system"
        ? (media.matches ? "dark" : "light")
        : theme;
      setResolvedTheme(resolved);
      root.classList.toggle("dark", resolved === "dark");
    };

    update();

    const cleanups: Array<() => void> = [];

    if (theme === "system") {
      const handler = () => update();
      media.addEventListener("change", handler);
      cleanups.push(() => media.removeEventListener("change", handler));
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== "theme") return;
      const next = e.newValue;
      if (next === "light" || next === "dark" || next === "system") {
        setThemeState(next);
      }
    };
    window.addEventListener("storage", onStorage);
    cleanups.push(() => window.removeEventListener("storage", onStorage));

    return () => cleanups.forEach((fn) => fn());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
