"use client";

import { useEffect, useState } from "react";
import { DICTIONARY } from "@/lib/i18n";

const STORAGE_KEY = "perseus-os-lang";
const LANGS = ["id", "en"];

export function useLanguage() {
  const [lang, setLangState] = useState("id");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = LANGS.includes(saved) ? saved : "id";
    setLangState(initial);
  }, []);

  function setLang(next) {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  function toggleLang() {
    setLang(lang === "id" ? "en" : "id");
  }

  return { lang, toggleLang, t: DICTIONARY[lang] };
}
