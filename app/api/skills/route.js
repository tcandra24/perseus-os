import { getSkillsFromNotion } from "@/lib/notion";

export const revalidate = 60;

export async function GET() {
  try {
    const skills = await getSkillsFromNotion();
    return Response.json(skills);
  } catch (err) {
    console.error("Gagal fetch skills dari Notion:", err);
    return Response.json({ error: "failed to fetch skills" }, { status: 500 });
  }
}
