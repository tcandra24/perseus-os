"use client";

import { useState, useEffect } from "react";

export default function SkillsApp() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSkills(data);
      })
      .catch(() => {
        setSkills([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section-title">✦ TECH STACK</div>
      {loading && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-text">MEMUAT DATA...</div>
        </div>
      )}

      {!loading && skills.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">⚡</div>
          <div className="empty-state-text">
            BELUM ADA SKILL
            <br />
            UNTUK DITAMPILKAN
          </div>
        </div>
      )}
      {!loading && skills.length > 0 && (
        <div className="tag-row">
          {skills.map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
