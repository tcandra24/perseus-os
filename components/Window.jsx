"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useWindowStore } from "@/store/useWindowStore";
import { APP_CONTENT } from "@/components/apps";
import { useIsMobile } from "@/hooks/useIsMobile";
import { playSound } from "@/lib/sound";

import AppIcon from "@/components/AppIcon";
import Minus from "@/components/Icon/Minus";
import Square from "@/components/Icon/Square";
import Copy from "@/components/Icon/Copy";
import Close from "@/components/Icon/Close";

const MIN_WIDTH = 260;
const MIN_HEIGHT = 200;
const TASKBAR_HEIGHT = 46;
const SNAP_THRESHOLD = 24;

export default function Window({ id, meta }) {
  const win = useWindowStore((s) => s.windows[id]);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const setPosition = useWindowStore((s) => s.setPosition);
  const setSize = useWindowStore((s) => s.setSize);
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);

  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const resizeRef = useRef({ resizing: false, startX: 0, startY: 0, startW: 0, startH: 0 });

  if (!win) return null;

  const AppContent = APP_CONTENT[id];

  function handleDragPointerDown(e) {
    if (isMobile || win.isMaximized) return; // fullscreen di mobile, tidak perlu drag
    if (e.target.closest(".win-btn")) return;
    dragRef.current.dragging = true;
    dragRef.current.offsetX = e.clientX - win.position.x;
    dragRef.current.offsetY = e.clientY - win.position.y;
    e.currentTarget.setPointerCapture(e.pointerId);
    focusWindow(id);
  }

  function handleDragPointerMove(e) {
    if (!dragRef.current.dragging) return;
    setPosition(id, {
      x: e.clientX - dragRef.current.offsetX,
      y: Math.max(0, e.clientY - dragRef.current.offsetY),
    });
  }

  function handleDragPointerUp() {
    if (dragRef.current.dragging) {
      const vw = window.innerWidth;
      const vh = window.innerHeight - TASKBAR_HEIGHT;
      let { x, y } = win.position;
      if (x < SNAP_THRESHOLD) x = 0;
      if (x + win.size.width > vw - SNAP_THRESHOLD) x = vw - win.size.width;
      if (y < SNAP_THRESHOLD) y = 0;
      if (y + win.size.height > vh - SNAP_THRESHOLD) y = vh - win.size.height;
      setPosition(id, { x, y });
    }
    dragRef.current.dragging = false;
  }

  function handleResizePointerDown(e) {
    e.stopPropagation();
    resizeRef.current.resizing = true;
    resizeRef.current.startX = e.clientX;
    resizeRef.current.startY = e.clientY;
    resizeRef.current.startW = win.size.width;
    resizeRef.current.startH = win.size.height;
    e.currentTarget.setPointerCapture(e.pointerId);
    focusWindow(id);
  }

  function handleResizePointerMove(e) {
    if (!resizeRef.current.resizing) return;
    const dx = e.clientX - resizeRef.current.startX;
    const dy = e.clientY - resizeRef.current.startY;
    setSize(id, {
      width: Math.max(MIN_WIDTH, resizeRef.current.startW + dx),
      height: Math.max(MIN_HEIGHT, resizeRef.current.startH + dy),
    });
  }

  function handleResizePointerUp() {
    resizeRef.current.resizing = false;
  }

  const style = isMobile
    ? { left: 0, top: 0, width: "100%", height: `calc(100% - ${TASKBAR_HEIGHT}px)`, zIndex: win.zIndex }
    : win.isMaximized
      ? { left: 0, top: 0, width: "100%", height: `calc(100% - ${TASKBAR_HEIGHT}px)`, zIndex: win.zIndex }
      : {
          left: win.position.x,
          top: win.position.y,
          width: win.size.width,
          height: win.size.height,
          zIndex: win.zIndex,
        };

  return (
    <motion.div
      className="window"
      style={style}
      onMouseDown={() => focusWindow(id)}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
    >
      <div className="title-bar" onPointerDown={handleDragPointerDown} onPointerMove={handleDragPointerMove} onPointerUp={handleDragPointerUp}>
        <div className="title-text">
          <AppIcon appId={id} size={20} /> {meta.title}
        </div>
        <div className="win-controls">
          <button className="win-btn" onClick={() => minimizeWindow(id)} aria-label="Minimize">
            <Minus />
          </button>
          {!isMobile && (
            <button className="win-btn" onClick={() => toggleMaximize(id)} aria-label="Maximize">
              {win.isMaximized ? <Copy /> : <Square />}
            </button>
          )}
          <button
            className="win-btn"
            onClick={() => {
              playSound("/sounds/close.wav");
              closeWindow(id);
            }}
            aria-label="Close"
          >
            <Close />
          </button>
        </div>
      </div>
      <div className="window-body">
        <AppContent />
      </div>

      {!isMobile && !win.isMaximized && <div className="resize-handle" onPointerDown={handleResizePointerDown} onPointerMove={handleResizePointerMove} onPointerUp={handleResizePointerUp} />}
    </motion.div>
  );
}
