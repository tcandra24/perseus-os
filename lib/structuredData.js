export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tito Candra",
    jobTitle: "Full-Stack Developer & AI Content Creator",
    url: "https://perseus-os.vercel.app",
    image: "https://perseus-os.vercel.app/avatar-photo.png",
    sameAs: ["https://github.com/tcandra24", "https://www.tiktok.com/@nova.verse_ai"],
    knowsAbout: ["Next.js", "React", "Vue", "Tailwind", "Laravel", "Express.js", "Supabase", "AI Video Production"],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Perseus OS",
    url: "https://perseus-os.vercel.app",
    description: "Portofolio interaktif desktop OS retro-anime style from Tito Candra/Perseus.",
  };
}
