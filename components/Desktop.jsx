"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

import { GAME_APP } from "@/data/gameApp";
import { APPS } from "@/data/apps";

import { playSound } from "@/lib/sound";

import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useIconPositions } from "@/hooks/useIconPositions";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

import { useWindowStore } from "@/store/useWindowStore";
import { useGameStore } from "@/store/useGameStore";

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
  game: "/snake.svg",
};

export default function Desktop() {
  useKeyboardShortcuts();

  const [contextMenu, setContextMenu] = useState(null); // {x, y} | null
  const [showIcons, setShowIcons] = useState(true);

  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);

  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const router = useRouter();

  const gameUnlocked = useGameStore((s) => s.unlocked);
  const loadGameStatus = useGameStore((s) => s.load);

  const contextItems = [
    { label: t.contextRefresh, onClick: () => window.location.reload() },
    { label: t.contextAbout, onClick: () => handleOpen(APPS.find((a) => a.id === "about")) },
    { label: t.themeNextLabel[theme], onClick: toggleTheme },
    { label: showIcons ? t.contextShowIcon : t.contextHideIcon, onClick: () => setShowIcons((v) => !v) },
  ];

  const { positions, setPosition, loaded } = useIconPositions();
  const dragRef = useRef({ id: null, startX: 0, startY: 0, moved: false, origX: 0, origY: 0 });

  const ICON_SLOT_HEIGHT = 96; // jarak vertikal default antar icon

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

  function getIconPosition(app, index) {
    if (positions[app.id]) return positions[app.id];
    return { x: 0, y: index * ICON_SLOT_HEIGHT };
  }

  function handleIconPointerDown(e, app, index) {
    const current = getIconPosition(app, index);
    dragRef.current = {
      id: app.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: current.x,
      origY: current.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleIconPointerMove(e) {
    const d = dragRef.current;
    if (!d.id) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;

    if (!d.moved && Math.hypot(dx, dy) > 6) {
      d.moved = true;
    }
    if (d.moved) {
      setPosition(d.id, { x: d.origX + dx, y: d.origY + dy });
    }
  }

  function handleIconPointerUp() {
    dragRef.current.id = null;
  }

  function handleIconClick(app) {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return; // ini hasil drag, bukan klik beneran — jangan buka window
    }
    handleOpen(app);
  }

  useEffect(() => {
    loadGameStatus();
  }, [loadGameStatus]);

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
      <div className="grid-floor" />
      <div className="scanlines" />
      <Stars />

      {showIcons && (
        <div className="icon-grid">
          {loaded &&
            APPS.map((app, index) => {
              const pos = getIconPosition(app, index);
              return (
                <div
                  key={app.id}
                  className="icon"
                  style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
                  onPointerDown={(e) => handleIconPointerDown(e, app, index)}
                  onPointerMove={handleIconPointerMove}
                  onPointerUp={handleIconPointerUp}
                  onClick={() => handleIconClick(app)}
                >
                  <div className="icon-glyph">
                    <AvatarPortrait src={ICON_SRC_MAP[app.id]} variant="icon" />
                  </div>
                  <div className="icon-label">{app.label}</div>
                </div>
              );
            })}

          {loaded && gameUnlocked && (
            <div
              key="game"
              className="icon"
              style={{ transform: `translate(${getIconPosition(GAME_APP, APPS.length).x}px, ${getIconPosition(GAME_APP, APPS.length).y}px)` }}
              onPointerDown={(e) => handleIconPointerDown(e, GAME_APP, APPS.length)}
              onPointerMove={handleIconPointerMove}
              onPointerUp={handleIconPointerUp}
              onClick={() => handleIconClick(GAME_APP)}
            >
              <div className="icon-glyph">
                <AvatarPortrait src={ICON_SRC_MAP.game} variant="icon" />
              </div>
              <div className="icon-label">{GAME_APP.label}</div>
            </div>
          )}
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
          const meta = APPS.find((a) => a.id === id) || (id === GAME_APP.id ? GAME_APP : null);
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
