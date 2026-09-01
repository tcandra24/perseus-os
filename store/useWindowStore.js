"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

let zCounter = 10;

export const useWindowStore = create(
  persist(
    (set, get) => ({
      windows: {},
      activeId: null,
      openWindow: (id, defaultSize) =>
        set((state) => {
          const existing = state.windows[id];
          if (existing) return { windows: { ...state.windows, [id]: { ...existing, isMinimized: false, zIndex: ++zCounter } } };
          const count = Object.keys(state.windows).length;
          return {
            activeId: id,
            windows: {
              ...state.windows,
              [id]: {
                isMinimized: false,
                zIndex: ++zCounter,
                position: { x: 60 + count * 24, y: 46 + count * 20 },
                size: defaultSize || { width: 380, height: 320 },
              },
            },
          };
        }),
      closeWindow: (id) =>
        set((state) => {
          const n = { ...state.windows };
          delete n[id];
          return { windows: n, activeId: state.activeId === id ? null : state.activeId };
        }),
      minimizeWindow: (id) =>
        set((state) => ({
          windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: true } },
          activeId: state.activeId === id ? null : state.activeId,
        })),
      focusWindow: (id) =>
        set((state) => {
          if (!state.windows[id]) return {};
          return { activeId: id, windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: false, zIndex: ++zCounter } } };
        }),
      setPosition: (id, position) =>
        set((state) => {
          if (!state.windows[id]) return {};
          return { windows: { ...state.windows, [id]: { ...state.windows[id], position } } };
        }),
      setSize: (id, size) =>
        set((state) => {
          if (!state.windows[id]) return {};
          return { windows: { ...state.windows, [id]: { ...state.windows[id], size } } };
        }),
      toggleMaximize: (id) =>
        set((state) => {
          const win = state.windows[id];
          if (!win) return {};

          if (win.isMaximized) {
            // restore ke posisi & ukuran sebelumnya
            return {
              windows: {
                ...state.windows,
                [id]: {
                  ...win,
                  isMaximized: false,
                  position: win.prevPosition,
                  size: win.prevSize,
                },
              },
            };
          }

          // simpan posisi/ukuran saat ini sebelum maximize
          return {
            windows: {
              ...state.windows,
              [id]: {
                ...win,
                isMaximized: true,
                prevPosition: win.position,
                prevSize: win.size,
              },
            },
          };
        }),
    }),
    {
      name: "perseus-os-windows",
      partialize: (state) => ({
        windows: Object.fromEntries(Object.entries(state.windows).map(([id, w]) => [id, { position: w.position, size: w.size }])),
      }),
    },
  ),
);
