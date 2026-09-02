"use client";
import { useLanguage } from "@/hooks/useLanguage";

export default function AboutApp() {
  const { t, lang } = useLanguage();

  return (
    <>
      <div className="section-title">{t.sectionAbout}</div>

      <div className="exp-item">
        <div className="exp-role">Full-Stack Developer</div>
        <div className="exp-meta">FREELANCE / PERSONAL PROJECTS</div>
        {lang === "id" ? "Membangun aplikasi web dengan Next.js, Laravel, dan Supabase untuk berbagai kebutuhan." : "Building web applications with Next.js, Laravel, and Supabase for various needs."}
      </div>

      <div className="exp-item">
        <div className="exp-role">AI Content Creator</div>
        <div className="exp-meta">SHORT-FORM VIDEO</div>
        {lang === "id" ? "Memproduksi konten video sinematik berbasis AI untuk TikTok, Reels, dan Shorts." : "Producing AI-driven cinematic video content for TikTok, Reels, and Shorts."}
      </div>

      <a className="cv-download" href="/cv/perseus-cv.pdf" download="Perseus-CV.pdf">
        {t.cvDownload}
      </a>
    </>
  );
}
