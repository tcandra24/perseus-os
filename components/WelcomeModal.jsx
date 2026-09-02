"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export default function WelcomeModal({ onClose }) {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const steps = t.welcomeSteps;
  const isLast = step === steps.length - 1;

  function next() {
    if (isLast) onClose();
    else setStep((s) => s + 1);
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <div className="welcome-overlay">
      <motion.div className="welcome-box" initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}>
        <div className="welcome-titlebar">
          <span>✧ {t.welcomeTitle}</span>
          <button className="win-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="welcome-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
            >
              <div className="welcome-step-title">{steps[step].title}</div>
              <div className="welcome-step-text">{steps[step].text}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="welcome-footer">
          <div className="welcome-dots">
            {steps.map((_, i) => (
              <span key={i} className={`welcome-dot ${i === step ? "active" : ""}`} />
            ))}
          </div>
          <div className="welcome-actions">
            {step > 0 && (
              <button className="welcome-btn ghost" onClick={back}>
                {t.welcomeBack}
              </button>
            )}
            {!isLast && (
              <button className="welcome-btn ghost" onClick={onClose}>
                {t.welcomeSkip}
              </button>
            )}
            <button className="welcome-btn primary" onClick={next}>
              {isLast ? t.welcomeStart : t.welcomeNext}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
