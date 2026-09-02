const CACHE_NAME = "perseus-os-v2"; // 👈 versi baru, otomatis hapus cache lama
const STATIC_CACHE_ASSETS = ["/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_CACHE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isNavigation = event.request.mode === "navigate";
  const isNextStaticAsset = event.request.url.includes("/_next/static/");

  // HTML / navigasi -> selalu coba jaringan dulu, cache cuma jadi fallback offline
  if (isNavigation) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  // asset hasil build Next.js (JS/CSS ber-hash) aman di-cache-first,
  // karena nama filenya otomatis berubah tiap build baru
  if (isNextStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return response;
          })
        );
      }),
    );
    return;
  }

  // asset lain (gambar, sound, dll) -> network-first, fallback cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
