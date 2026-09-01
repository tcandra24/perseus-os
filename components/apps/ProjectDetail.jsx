"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectDetail({ project, onBack }) {
  const [index, setIndex] = useState(0);
  const images = project.images || [];

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <>
      <div className="detail-back" onClick={onBack}>
        ← KEMBALI
      </div>
      <div className="section-title">✦ {project.name.toUpperCase()}</div>

      {images.length > 0 ? (
        <div className="gallery">
          <div className="gallery-frame">
            <Image src={images[index]} alt={`${project.name} screenshot ${index + 1}`} fill sizes="400px" style={{ objectFit: "cover" }} />
          </div>
          {images.length > 1 && (
            <div className="gallery-controls">
              <button className="gallery-btn" onClick={prev}>
                ‹
              </button>
              <div className="gallery-dots">
                {images.map((_, i) => (
                  <span key={i} className={`gallery-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
                ))}
              </div>
              <button className="gallery-btn" onClick={next}>
                ›
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="gallery-empty">Belum ada screenshot untuk proyek ini.</div>
      )}

      <p style={{ marginTop: 14 }}>{project.description}</p>
      <div className="tag-row">
        {project.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </>
  );
}
