import { getProjectsFromNotion } from "@/lib/notion";

export const revalidate = 60; // cache 60 detik, lalu ambil data baru dari Notion

export async function GET() {
  try {
    const projects = await getProjectsFromNotion();
    return Response.json(projects);
  } catch (err) {
    console.error("Gagal fetch projects dari Notion:", err);
    return Response.json({ error: "failed to fetch projects" }, { status: 500 });
  }
}
