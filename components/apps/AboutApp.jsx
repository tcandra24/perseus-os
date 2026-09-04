"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

import AvatarPortrait from "@/components/AvatarPortrait";
import Sparkle from "@/components/Icon/Sparkle";
import SquareText from "@/components/Icon/SquareText";

export default function AboutApp() {
  const { t } = useLanguage();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/experiences")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setExperiences(data);
      })
      .catch(() => setExperiences([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AvatarPortrait src="/avatar.svg" />
      <div className="section-title flex gap-2">
        <Sparkle />
        {t.sectionAbout}
      </div>

      {loading && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-text">{t.loadingData}</div>
        </div>
      )}

      {!loading && experiences.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">⚡</div>
          <div className="empty-state-text">
            {t.emptyExperiences.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      )}

      {!loading && experiences.length > 0 && (
        <div className="tag-row">
          {experiences.map((e, i) => (
            <div className="exp-item" key={i}>
              <div className="exp-role">{e.position}</div>
              <div className="exp-meta">{e.company}</div>
              {e.start_date} - {e.end_date ? e.end_date : t.sectionExperienceEndDate}
            </div>
          ))}
        </div>
      )}

      <a className="cv-download flex gap-2" href="/cv/perseus-cv.pdf" download="Perseus-CV.pdf">
        <SquareText />
        {t.cvDownload}
      </a>
    </>
  );
}
