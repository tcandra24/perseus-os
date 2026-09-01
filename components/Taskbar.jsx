"use client";

import { useWindowStore } from "@/store/useWindowStore";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { APPS } from "@/data/apps";

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const [time, setTime] = useState("");

  const { theme, toggleTheme } = useTheme();

  const THEME_ICONS = { blue: "🌙", sakura: "🌸", matrix: "💻" };

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
    <div className="taskbar">
      <div className="task-logo">✧ PERSEUS-OS</div>
      <div className="task-items">
        {openIds.map((id) => {
          const meta = APPS.find((a) => a.id === id);
          if (!meta) return null;
          return (
            <div key={id} className="task-item" onClick={() => focusWindow(id)}>
              <span>{meta.icon}</span> {meta.title}
            </div>
          );
        })}
      </div>
      <button className="theme-toggle" onClick={toggleTheme} title="Ganti tema">
        {THEME_ICONS[theme]}
      </button>
      <div className="clock">{time}</div>
    </div>
  );
}
