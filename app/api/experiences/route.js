import { getExperiencesFromNotion } from "@/lib/notion";

export const revalidate = 60;

export async function GET() {
  try {
    const experiences = await getExperiencesFromNotion();
    return Response.json(experiences);
  } catch (err) {
    console.error("Gagal fetch experiences dari Notion:", err);
    return Response.json({ error: "failed to fetch experiences" }, { status: 500 });
  }
}
