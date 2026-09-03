"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

import Sparkle from "@/components/Icon/Sparkle";

export default function SkillsApp() {
  const { t } = useLanguage();
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
      <div className="section-title flex gap-2">
        <Sparkle />
        {t.sectionSkills}
      </div>
      {loading && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-text">{t.loadingData}</div>
        </div>
      )}

      {!loading && skills.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">⚡</div>
          <div className="empty-state-text">
            {t.emptySkills.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
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
