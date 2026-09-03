"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect } from "react";
import ProjectDetail from "./ProjectDetail";

import Sparkle from "@/components/Icon/Sparkle";

export default function ProjectsApp() {
  const { t } = useLanguage();
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
      <div className="section-title flex gap-2">
        <Sparkle />
        {t.sectionProjects}
      </div>
      {loading && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-text">{t.loadingData}</div>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📼</div>
          <div className="empty-state-text">
            {t.emptyProjects.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      )}

      {!loading &&
        projects.map((p) => (
          <div className="project-card project-card-clickable" key={p.slug} onClick={() => setSelected(p)}>
            <div className="project-head">
              <span className="project-name">{p.name}</span>
              <span className={`badge badge-${p.status}`}>{p.status === "done" ? t.statusDone : t.statusWip}</span>
            </div>
            {p.description}
            <div className="tag-row">
              {p.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
    </>
  );
}
