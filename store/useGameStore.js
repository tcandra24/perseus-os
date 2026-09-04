"use client";

import { create } from "zustand";

const STORAGE_KEY = "perseus-os-game-unlocked";

export const useGameStore = create((set, get) => ({
  unlocked: false,

  load: () => {
    const saved = localStorage.getItem(STORAGE_KEY) === "1";
    set({ unlocked: saved });
  },

  unlock: () => {
    set({ unlocked: true });
    localStorage.setItem(STORAGE_KEY, "1");
  },
}));
