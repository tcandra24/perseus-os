"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEasterEggStore } from "@/store/useEasterEggStore";

export default function EasterEgg() {
  const active = useEasterEggStore((s) => s.active);
  const reset = useEasterEggStore((s) => s.reset);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(reset, 3200);
    return () => clearTimeout(t);
  }, [active, reset]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div className="easter-egg-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={shouldReduceMotion ? { duration: 0 } : undefined}>
          <motion.div
            className="easter-egg-box"
            initial={shouldReduceMotion ? false : { scale: 0.7, rotate: -4 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 18 }}
          >
            <div className="easter-egg-title">✦ SECRET FOUND ✦</div>
            <div className="easter-egg-text">
              Kamu nemuin easter egg tersembunyi!
              <br />
              Coba buka Terminal dan ketik <b>sudo hire-me</b> 👀
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
