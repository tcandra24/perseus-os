"use client";

import { useState, useEffect } from "react";
import Desktop from "@/components/Desktop";
import BootScreen from "@/components/BootScreen";
import { useWindowStore } from "@/store/useWindowStore";
import { APPS } from "@/data/apps";

export default function HomeClient({ initialApp }) {
  const [booted, setBooted] = useState(false);
  const openWindow = useWindowStore((s) => s.openWindow);

  useEffect(() => {
    if (!booted) return;
    const meta = APPS.find((a) => a.id === initialApp);
    if (meta) openWindow(meta.id, { width: meta.width, height: meta.height });
  }, [booted, initialApp, openWindow]);

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;
  return <Desktop />;
}
