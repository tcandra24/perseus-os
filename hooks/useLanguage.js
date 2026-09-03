"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { DICTIONARY } from "@/lib/i18n";

const STORAGE_KEY = "perseus-os-lang";
const LANGS = ["id", "en"];

const useLanguageStore = create((set) => ({
  lang: "id",

  setLang: (next) => {
    set({ lang: next });
    localStorage.setItem(STORAGE_KEY, next);
  },
}));

export function useLanguage() {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = LANGS.includes(saved) ? saved : "id";
    setLang(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleLang() {
    setLang(lang === "id" ? "en" : "id");
  }

  return { lang, toggleLang, t: DICTIONARY[lang] };
}
