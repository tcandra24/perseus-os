"use client";

import { useEffect, useState } from "react";

const STAR_CHARS = ["★", "☆", "✦", "✧"];

export default function Stars({ count = 22 }) {
  const [stars, setStars] = useState([]);

  // digenerate di client saja (setelah mount) supaya posisi acak
  // tidak menyebabkan hydration mismatch antara server & client.
  useEffect(() => {
    const generated = Array.from({ length: count }).map(() => ({
      char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
      left: Math.random() * 100,
      top: Math.random() * 55,
      delay: Math.random() * 2.4,
      size: 8 + Math.random() * 10,
    }));
    setStars(generated);
  }, [count]);

  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            fontSize: `${s.size}px`,
          }}
        >
          {s.char}
        </div>
      ))}
    </>
  );
}
