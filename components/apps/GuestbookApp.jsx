"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function GuestbookApp() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", message: "", honeypot: "" });
  const [status, setStatus] = useState("idle");

  function loadEntries() {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setEntries(data))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", message: "", honeypot: "" });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <>
      <div className="section-title">{t.guestbookTitle}</div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" value={form.honeypot} onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))} className="honeypot-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input className="contact-input" placeholder={t.guestbookName} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        <textarea className="contact-input contact-textarea" placeholder={t.guestbookMessage} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={3} required />
        <button className="contact-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.guestbookSending : t.guestbookSubmit}
        </button>
        {status === "sent" && <div className="contact-feedback ok">{t.guestbookSent}</div>}
        {status === "error" && <div className="contact-feedback error">{t.guestbookError}</div>}
      </form>

      <div className="section-title" style={{ marginTop: 20 }}>
        {t.guestbookWall}
      </div>

      {loading && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-text">{t.loadingData}</div>
        </div>
      )}

      {!loading && entries.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📖</div>
          <div className="empty-state-text">{t.guestbookEmpty}</div>
        </div>
      )}

      {!loading &&
        entries.map((entry) => (
          <div className="project-card" key={entry.id}>
            <div className="exp-role">{entry.name}</div>
            <div style={{ marginTop: 6 }}>{entry.message}</div>
          </div>
        ))}
    </>
  );
}
