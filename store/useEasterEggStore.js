"use client";

import { create } from "zustand";

export const useEasterEggStore = create((set) => ({
  active: false,
  trigger: () => set({ active: true }),
  reset: () => set({ active: false }),
}));
