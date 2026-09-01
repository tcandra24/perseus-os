import { APPS } from "@/data/apps";
import HomeClient from "@/components/HomeClient";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const meta = APPS.find((a) => a.id === params?.app);

  if (!meta) {
    return {
      title: "Perseus OS",
      description: "Portofolio interaktif bergaya desktop OS retro-anime milik Perseus.",
      openGraph: {
        title: "Perseus OS",
        description: "Portofolio interaktif bergaya desktop OS retro-anime milik Perseus.",
        images: ["/og-default.png"],
      },
    };
  }

  const title = `${meta.title} — Perseus OS`;
  return {
    title,
    description: meta.seoDescription,
    openGraph: {
      title,
      description: meta.seoDescription,
      images: [`/og/${meta.id}.png`],
    },
  };
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  return <HomeClient initialApp={params?.app} />;
}
