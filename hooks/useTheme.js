"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-os-theme";
const THEMES = ["blue", "sakura", "matrix"];

export function useTheme() {
  const [theme, setThemeState] = useState("blue");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = THEMES.includes(saved) ? saved : "blue";
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function setTheme(next) {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  function toggleTheme() {
    const currentIndex = THEMES.indexOf(theme);
    const next = THEMES[(currentIndex + 1) % THEMES.length];
    setTheme(next);
  }

  return { theme, toggleTheme, themes: THEMES };
}
