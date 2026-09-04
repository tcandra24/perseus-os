"use client";

import { useEffect, useState } from "react";

import { useEasterEggStore } from "@/store/useEasterEggStore";
import { useWindowStore } from "@/store/useWindowStore";
import { useGameStore } from "@/store/useGameStore";

import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useSound } from "@/hooks/useSound";
import { useRef } from "react";

import { APPS } from "@/data/apps";

import AppIcon from "@/components/AppIcon";

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const [time, setTime] = useState("");

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);
  const trigger = useEasterEggStore((s) => s.trigger);

  const { theme, toggleTheme } = useTheme();

  const THEME_ICONS = { blue: "🌙", sakura: "🌸", matrix: "💻" };

  const { lang, toggleLang } = useLanguage();
  const { muted, toggleMute } = useSound();

  const unlockGame = useGameStore((s) => s.unlock);

  function handleLogoClick() {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 700);

    if (clickCountRef.current >= 5) {
      trigger();
      unlockGame();
      clickCountRef.current = 0;
    }
  }

  useEffect(() => {
    function update() {
      setTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    }
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  const openIds = Object.keys(windows);

  return (
    <div className="taskbar justify-between">
      <div className="flex gap-2">
        <div className="task-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          PERSEUS-OS
        </div>
        <div className="task-items">
          {openIds.map((id) => {
            const meta = APPS.find((a) => a.id === id);
            if (!meta) return null;
            return (
              <div key={id} className="task-item" onClick={() => focusWindow(id)}>
                <AppIcon appId={id} size={20} /> {meta.title}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        <button className="theme-toggle" onClick={toggleTheme} title="Ganti tema">
          {THEME_ICONS[theme]}
        </button>
        <button className="theme-toggle" onClick={toggleMute} title={muted ? "Unmute" : "Mute"}>
          {muted ? "🔇" : "🔊"}
        </button>
        <button className="theme-toggle" onClick={toggleLang} title="Switch language">
          {lang === "id" ? "🇮🇩" : "🇬🇧"}
        </button>
        <div className="clock">{time}</div>
      </div>
    </div>
  );
}
