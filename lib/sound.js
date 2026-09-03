const STORAGE_KEY = "perseus-os-muted";

export function isSoundMuted() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "1";
}

export function playSound(src, volume = 0.4) {
  if (typeof window === "undefined") return;
  if (isSoundMuted()) return;

  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
}
