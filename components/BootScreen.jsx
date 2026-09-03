"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

import Sparkle from "@/components/Icon/Sparkle";

export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 180);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="boot-screen">
      <div className="boot-title flex gap-2">
        <Sparkle />
        PERSEUS-OS
        <Sparkle />
      </div>
      <div className="boot-bar">
        <div className="boot-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="boot-text">
        {t.bootLoading}
        {"".padEnd(Math.floor(progress / 20), ".")}
      </div>
    </div>
  );
}
