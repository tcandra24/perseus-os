import { SKILLS } from "@/data/skills";

export default function SkillsApp() {
  return (
    <>
      <div className="section-title">✦ TECH STACK</div>
      <div className="tag-row">
        {SKILLS.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
    </>
  );
}
