"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "perseus-os-icon-positions";

export function useIconPositions() {
  const [positions, setPositions] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPositions(JSON.parse(saved));
    } catch {
      // biarkan default kosong kalau data korup
    }
    setLoaded(true);
  }, []);

  function setPosition(id, pos) {
    setPositions((prev) => {
      const next = { ...prev, [id]: pos };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { positions, setPosition, loaded };
}
