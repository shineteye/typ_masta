import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

function systemTheme() {
  try {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("typmasta.theme", systemTheme());

  // The tokens key off data-theme, so the attribute is the single source of
  // truth for which palette is live.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
