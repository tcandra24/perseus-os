"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Desktop from "@/components/Desktop";
import BootScreen from "@/components/BootScreen";
import { useWindowStore } from "@/store/useWindowStore";
import { APPS } from "@/data/apps";

export default function HomeClient() {
  const [booted, setBooted] = useState(false);
  const openWindow = useWindowStore((s) => s.openWindow);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!booted) return;
    // baca ?app= dari URL cuma sekali, tepat setelah boot selesai
    const initialAppId = searchParams.get("app");
    const meta = APPS.find((a) => a.id === initialAppId);
    if (meta) openWindow(meta.id, { width: meta.width, height: meta.height });
    // sengaja cuma depend ke `booted`, bukan searchParams,
    // supaya tidak ke-trigger ulang tiap kali icon diklik
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;
  return <Desktop />;
}
