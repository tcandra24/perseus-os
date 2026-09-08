import { getApprovedGuestbookEntries, addGuestbookEntry } from "@/lib/notion";

export const revalidate = 30;

export async function GET() {
  try {
    const entries = await getApprovedGuestbookEntries();
    return Response.json(entries);
  } catch (err) {
    console.error("Gagal fetch guestbook:", err);
    return Response.json({ error: "failed to fetch guestbook" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message, honeypot } = body;

    // honeypot terisi = bot, diam-diam anggap sukses tanpa nulis apa pun
    if (honeypot && honeypot.trim() !== "") {
      return Response.json({ success: true });
    }

    if (!name?.trim() || !message?.trim()) {
      return Response.json({ error: "name and message are required" }, { status: 400 });
    }

    await addGuestbookEntry({ name: name.trim(), message: message.trim() });
    return Response.json({ success: true });
  } catch (err) {
    console.error("Gagal kirim guestbook:", err);
    return Response.json({ error: "failed to submit" }, { status: 500 });
  }
}
