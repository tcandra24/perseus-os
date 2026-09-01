"use client";

import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useWindowStore } from "@/store/useWindowStore";
import ContextMenu from "@/components/ContextMenu";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import Taskbar from "@/components/Taskbar";
import Window from "@/components/Window";
import { playSound } from "@/lib/sound";
import Stars from "@/components/Stars";
import { APPS } from "@/data/apps";
import { useState } from "react";

export default function Desktop() {
  useKeyboardShortcuts();

  const [contextMenu, setContextMenu] = useState(null); // {x, y} | null
  const [showIcons, setShowIcons] = useState(true);

  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);

  const { theme, toggleTheme } = useTheme();

  const router = useRouter();

  const THEME_LABELS = { blue: "🌸 GANTI KE SAKURA", sakura: "💻 GANTI KE MATRIX", matrix: "🌙 GANTI KE BIRU" };

  const contextItems = [
    { label: "🔄 REFRESH DESKTOP", onClick: () => window.location.reload() },
    { label: "🎀 BUKA ABOUT ME", onClick: () => handleOpen(APPS.find((a) => a.id === "about")) },
    { label: THEME_LABELS[theme], onClick: toggleTheme },
    { label: showIcons ? "🙈 SEMBUNYIKAN ICON" : "👁 TAMPILKAN ICON", onClick: () => setShowIcons((v) => !v) },
  ];

  function handleOpen(app) {
    playSound("/sounds/click.wav");
    openWindow(app.id, { width: app.width, height: app.height });
    router.replace(`/?app=${app.id}`, { scroll: false });
  }

  function handleContextMenu(e) {
    // jangan munculkan menu kalau klik-kanannya kena icon atau window
    if (e.target.closest(".icon") || e.target.closest(".window")) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
      <div className="grid-floor" />
      <div className="scanlines" />
      <Stars />

      {showIcons && (
        <div className="icon-grid">
          {APPS.map((app) => (
            <div key={app.id} className="icon" onClick={() => handleOpen(app)}>
              <div className="icon-glyph">{app.icon}</div>
              <div className="icon-label">{app.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="hint">★ KLIK ICON UNTUK BUKA WINDOW ★</div>

      <AnimatePresence>
        {Object.entries(windows).map(([id, win]) => {
          if (win.isMinimized) return null;
          const meta = APPS.find((a) => a.id === id);
          if (!meta) return null;
          return <Window key={id} id={id} meta={meta} />;
        })}
      </AnimatePresence>

      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} items={contextItems} onClose={() => setContextMenu(null)} />}

      <Taskbar />
    </div>
  );
}
