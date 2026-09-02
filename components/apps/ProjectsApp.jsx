"use client";

import { useState, useEffect } from "react";
import ProjectDetail from "./ProjectDetail";

export default function ProjectsApp() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {
        setProjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <>
      <div className="section-title">✦ DAFTAR PROYEK</div>
      {loading && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-text">MEMUAT DATA...</div>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📼</div>
          <div className="empty-state-text">
            BELUM ADA PROYEK
            <br />
            UNTUK DITAMPILKAN
          </div>
        </div>
      )}

      {!loading &&
        projects.map((p) => (
          <div className="project-card project-card-clickable" key={p.slug} onClick={() => setSelected(p)}>
            <div className="project-head">
              <span className="project-name">{p.name}</span>
              <span className={`badge badge-${p.status}`}>{p.status === "done" ? "SELESAI" : "ON PROGRESS"}</span>
            </div>
            {p.description}
            <div className="tag-row">
              {p.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
    </>
  );
}
