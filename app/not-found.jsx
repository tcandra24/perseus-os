"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
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
      <div className="notfound-title">FILE NOT FOUND</div>
      <div className="notfound-text">
        Window yang kamu cari nggak ada di desktop ini.
        <br />
        Mungkin sudah di-uninstall, atau alamatnya salah ketik.
      </div>
      <Link href="/" className="notfound-btn">
        ← KEMBALI KE DESKTOP
      </Link>
    </div>
  );
}
