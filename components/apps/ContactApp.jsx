"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/hooks/useLanguage";

import Sparkle from "@/components/Icon/Sparkle";

export default function ContactApp() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, { from_name: form.name, from_email: form.email, message: form.message }, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      <div className="section-title flex gap-2">
        <Sparkle />
        {t.sectionContact}
      </div>

      <a className="contact-link" href="mailto:email@perseus.dev">
        ✉ EMAIL@PERSEUS.DEV
      </a>
      <a className="contact-link" href="https://github.com/" target="_blank" rel="noreferrer">
        💻 GITHUB/PERSEUS
      </a>
      <a className="contact-link" href="https://tiktok.com/" target="_blank" rel="noreferrer">
        🎬 TIKTOK/@PERSEUS
      </a>

      <div className="section-title flex gap-2" style={{ marginTop: 20 }}>
        <Sparkle />
        {t.sectionContactForm}
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input className="contact-input" name="name" placeholder={t.formName} value={form.name} onChange={handleChange} required />
        <input className="contact-input" type="email" name="email" placeholder={t.formEmail} value={form.email} onChange={handleChange} required />
        <textarea className="contact-input contact-textarea" name="message" placeholder={t.formMessage} value={form.message} onChange={handleChange} rows={4} required />
        <button className="contact-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.formSubmitting : t.formSubmit}
        </button>
        {status === "sent" && <div className="contact-feedback ok">{t.formSent}</div>}
        {status === "error" && <div className="contact-feedback error">{t.formError}</div>}
      </form>
    </>
  );
}
