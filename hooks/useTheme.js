"use client";

import { create } from "zustand";
import { useEffect } from "react";

const STORAGE_KEY = "portfolio-os-theme";
const THEMES = ["blue", "sakura", "matrix"];

const useThemeStore = create((set, get) => ({
  theme: "blue",

  setTheme: (next) => {
    set({ theme: next });
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  },

  toggleTheme: () => {
    const current = get().theme;
    const nextIndex = (THEMES.indexOf(current) + 1) % THEMES.length;
    get().setTheme(THEMES[nextIndex]);
  },
}));

export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  // load preferensi tersimpan sekali saat pertama kali hook ini dipakai di app
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = THEMES.includes(saved) ? saved : "blue";
    setTheme(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { theme, toggleTheme, themes: THEMES };
}
