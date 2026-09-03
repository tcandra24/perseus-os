"use client";

import { useState } from "react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useWindowStore } from "@/store/useWindowStore";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatePresence } from "framer-motion";
import { APPS } from "@/data/apps";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import { playSound } from "@/lib/sound";
import { track } from "@vercel/analytics";

import Taskbar from "@/components/Taskbar";
import Window from "@/components/Window";
import EasterEgg from "@/components/EasterEgg";
import Stars from "@/components/Stars";
import ContextMenu from "@/components/ContextMenu";

import AvatarPortrait from "@/components/AvatarPortrait";
import Sparkle from "@/components/Icon/Sparkle";

const ICON_SRC_MAP = {
  about: "/avatar.svg",
  projects: "/rocket.svg",
  skills: "/bolt.svg",
  contact: "/letter.svg",
  terminal: "/pc.svg",
};

export default function Desktop() {
  useKeyboardShortcuts();

  const [contextMenu, setContextMenu] = useState(null); // {x, y} | null
  const [showIcons, setShowIcons] = useState(true);

  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);

  const { theme, toggleTheme } = useTheme();

  const router = useRouter();

  const THEME_LABELS = { blue: "🌸 GANTI KE SAKURA", sakura: "💻 GANTI KE MATRIX", matrix: "🌙 GANTI KE BIRU" };

  const { t } = useLanguage();

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

    track("open_app", { app: app.id });
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
              <div className="icon-glyph">
                <AvatarPortrait src={ICON_SRC_MAP[app.id]} variant="icon" />
              </div>
              <div className="icon-label">{app.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="hint flex gap-2">
        <Sparkle />
        {t.hint}
        <Sparkle />
      </div>

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
      <EasterEgg />
    </div>
  );
}
