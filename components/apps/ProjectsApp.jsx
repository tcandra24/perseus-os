"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import ProjectDetail from "./ProjectDetail";

export default function ProjectsApp() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <>
      <div className="section-title">✦ DAFTAR PROYEK</div>
      {PROJECTS.map((p) => (
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
