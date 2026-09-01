# Portfolio OS — v2

Portofolio bergaya desktop OS (retro + anime, tema biru-pink), Next.js App Router + Zustand + Framer Motion.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Apa yang baru di v2

- **Animasi buka/tutup window** — pakai `framer-motion` (`AnimatePresence` + `motion.div`), window scale+fade in/out saat dibuka, di-close, atau di-minimize.
- **Resize window** — drag pegangan di pojok kanan-bawah tiap window (mouse & touch), ukuran minimum dijaga biar konten tidak rusak.
- **Layout responsif di mobile** — di layar ≤640px, window otomatis fullscreen (drag & resize dimatikan karena tidak relevan di layar sempit), dideteksi lewat hook `useIsMobile`.
- **Semua dependency di-upgrade ke versi terbaru** (per tanggal build ini):
  - `next` 16.3.4
  - `react` / `react-dom` 19.2.8
  - `zustand` 5.0.15
  - `framer-motion` 13.1.1
  - `tailwindcss` + `@tailwindcss/postcss` 4.3.3 (migrasi ke Tailwind v4 — lihat catatan di bawah)

### Catatan migrasi Tailwind v3 → v4

- `tailwind.config.js` dihapus — Tailwind v4 tidak mewajibkan file config terpisah kalau tidak butuh custom theme lewat JS (kita memang tidak pakai utility class custom di project ini, semua styling ada di `globals.css`).
- `postcss.config.js` sekarang cukup memanggil plugin `@tailwindcss/postcss` (menggantikan kombinasi `tailwindcss` + `autoprefixer` di v3).
- `app/globals.css` sekarang pakai `@import "tailwindcss";` menggantikan 3 baris `@tailwind base/components/utilities;` di v3.

## Struktur project

```
app/
  layout.jsx
  page.jsx
  globals.css

components/
  Desktop.jsx        -> render icon, background FX, bungkus daftar window dengan AnimatePresence
  Window.jsx           -> draggable + resizable + animasi + mode fullscreen mobile
  Taskbar.jsx
  Stars.jsx
  apps/
    ProjectsApp.jsx / AboutApp.jsx / SkillsApp.jsx / ContactApp.jsx
    index.js

store/
  useWindowStore.js    -> state window: posisi, ukuran, minimize, fokus (Zustand)

data/
  apps.js              -> metadata icon + ukuran default tiap window (width, height)

hooks/
  useIsMobile.js        -> deteksi breakpoint mobile (≤640px) untuk mode fullscreen
```

## Cara nambah "app" baru

1. Buat komponen baru di `components/apps/NamaApp.jsx`
2. Daftarkan di `components/apps/index.js`
3. Tambah entry baru di `data/apps.js` (isi `width` & `height` default)

## Belum ada di v2 (ide buat v3)

- Data project/skill masih hardcode, belum konek CMS/JSON eksternal
- Efek suara klik/buka window
- Boot-up loading screen ala OS asli
- Snap-to-edge saat drag window ke pinggir layar
