"use client";

import { useEffect } from "react";
import { useWindowStore } from "@/store/useWindowStore";

export function useKeyboardShortcuts() {
  const activeId = useWindowStore((s) => s.activeId);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);

  useEffect(() => {
    function handleKeyDown(e) {
      // jangan ganggu kalau user lagi ngetik di input/textarea
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (!activeId) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeWindow(activeId);
      }

      const isModM = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m";
      if (isModM) {
        e.preventDefault();
        minimizeWindow(activeId);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, closeWindow, minimizeWindow]);
}
