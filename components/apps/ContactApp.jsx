"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      <div className="section-title">✦ HUBUNGI SAYA</div>
      <a className="contact-link" href="mailto:titocandradev@gmail.com">
        ✉ TITOCANDRADEV@GMAIL.COM
      </a>
      <a className="contact-link" href="https://github.com/tcandra24" target="_blank" rel="noreferrer noopener">
        💻 GITHUB/TCANDRA24
      </a>
      <a className="contact-link" href="https://tiktok.com/@nova.verse_ai" target="_blank" rel="noreferrer noopener">
        🎬 TIKTOK/@NOVA.VERSE_AI
      </a>

      <div className="section-title" style={{ marginTop: 20 }}>
        ✦ ATAU KIRIM PESAN
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input className="contact-input" name="name" placeholder="Nama kamu" value={form.name} onChange={handleChange} required />
        <input className="contact-input" type="email" name="email" placeholder="Email kamu" value={form.email} onChange={handleChange} required />
        <textarea className="contact-input contact-textarea" name="message" placeholder="Pesan..." value={form.message} onChange={handleChange} rows={4} required />
        <button className="contact-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "MENGIRIM..." : "KIRIM PESAN"}
        </button>

        {status === "sent" && <div className="contact-feedback ok">✦ Pesan terkirim!</div>}
        {status === "error" && <div className="contact-feedback error">✕ Gagal kirim, coba lagi.</div>}
      </form>
    </>
  );
}
