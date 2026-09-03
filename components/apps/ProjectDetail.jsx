"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import Image from "next/image";

import Sparkle from "@/components/Icon/Sparkle";
import ArrowLeft from "@/components/Icon/ArrowLeft";
import ChevronLeft from "@/components/Icon/ChevronLeft";
import ChevronRight from "@/components/Icon/ChevronRight";

export default function ProjectDetail({ project, onBack }) {
  const [index, setIndex] = useState(0);
  const images = project.images || [];
  const { t } = useLanguage();

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <>
      <div className="detail-back flex gap-2" onClick={onBack}>
        <ArrowLeft />
        {t.detailBack}
      </div>
      <div className="section-title flex gap-2">
        <Sparkle />
        {project.name.toUpperCase()}
      </div>

      {images.length > 0 ? (
        <div className="gallery">
          <div className="gallery-frame">
            <Image src={images[index]} alt={`${project.name} screenshot ${index + 1}`} fill sizes="400px" style={{ objectFit: "cover" }} />
          </div>
          {images.length > 1 && (
            <div className="gallery-controls">
              <button className="gallery-btn" onClick={prev}>
                <ChevronLeft />
              </button>
              <div className="gallery-dots">
                {images.map((_, i) => (
                  <span key={i} className={`gallery-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
                ))}
              </div>
              <button className="gallery-btn" onClick={next}>
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="gallery-empty">{t.galleryEmpty}</div>
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
