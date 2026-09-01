"use client";
import { useEffect, useState } from "react";

export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

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
      <div className="boot-title">✧ PERSEUS-OS ✧</div>
      <div className="boot-bar">
        <div className="boot-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="boot-text">LOADING{"".padEnd(Math.floor(progress / 20), ".")}</div>
    </div>
  );
}
