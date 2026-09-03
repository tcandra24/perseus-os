"use client";

import { useEffect, useRef, useState } from "react";

export default function AvatarPortrait({ src, variant = "full" }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((svgText) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svgText;
        }
      })
      .catch(() => setError(true));
  }, [src]);

  if (error) return null;

  const className = variant === "icon" ? "avatar-icon" : "avatar-frame";
  return <div className={className} ref={containerRef} />;
}
