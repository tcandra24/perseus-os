import { Suspense } from "react";
import { APPS } from "@/data/apps";
import HomeClient from "@/components/HomeClient";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const meta = APPS.find((a) => a.id === params?.app);

  if (!meta) {
    return {
      title: "Perseus OS",
      description: "Perseus's retro-anime desktop OS-style interactive portfolio.",
      openGraph: {
        title: "Perseus OS",
        description: "Perseus's retro-anime desktop OS-style interactive portfolio.",
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

export default async function Home() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
