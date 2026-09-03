"use client";
import { useLanguage } from "@/hooks/useLanguage";

import ArrowLeft from "@/components/Icon/ArrowLeft";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { t } = useLanguage();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notfound-screen">
      <div className="notfound-scanlines" />
      <div className={`notfound-code ${glitch ? "glitch" : ""}`}>404</div>
      <div className="notfound-title">{t.notFoundTitle}</div>
      <div className="notfound-text">
        {t.notFoundText.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </div>
      <Link href="/" className="notfound-btn flex gap-2">
        <ArrowLeft />
        {t.notFoundBack}
      </Link>
    </div>
  );
}
