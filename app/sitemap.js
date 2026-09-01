import { APPS } from "@/data/apps";

export default function sitemap() {
  const base = "http://localhost:3000";

  const appUrls = APPS.map((app) => ({
    url: `${base}/?app=${app.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [{ url: base, lastModified: new Date(), priority: 1.0 }, ...appUrls];
}
