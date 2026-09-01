export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://perseus-os.vercel.app/sitemap.xml",
  };
}
