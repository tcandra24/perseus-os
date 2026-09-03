"use client";

import { useEffect, useState } from "react";
import { isSoundMuted } from "@/lib/sound";

const STORAGE_KEY = "perseus-os-muted";

export function useSound() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isSoundMuted());
  }, []);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  }

  return { muted, toggleMute };
}
