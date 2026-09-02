"use client";

import { useState, useRef, useEffect } from "react";
import { PROJECTS as FALLBACK_PROJECTS } from "@/data/projects";
import { SKILLS as FALLBACK_SKILLS } from "@/data/skills";

const BOOT_LINES = ["PERSEUS-OS TERMINAL v1.0", "Ketik 'help' untuk lihat semua command."];

function runCommand(input, projects, skills) {
  const cmd = input.trim().toLowerCase();

  if (cmd === "") return [];
  if (cmd === "help") {
    return [
      "COMMAND YANG TERSEDIA:",
      "  whoami        - tentang saya",
      "  skills        - tech stack",
      "  projects      - daftar proyek",
      "  contact       - cara hubungi saya",
      "  sudo hire-me  - ??? coba aja",
      "  cv / resume   - download CV saya",
      "  clear         - bersihkan layar",
    ];
  }
  if (cmd === "whoami") {
    return ["Perseus — Full-Stack Developer & AI Content Creator", "Base: Indonesia. Stack: Next.js, Laravel, Supabase, Express.js.", "Juga bikin video sinematik AI-generated untuk short-form content."];
  }
  if (cmd === "skills") {
    return [skills.join(", ")];
  }
  if (cmd === "projects") {
    return projects.map((p) => `- ${p.name} [${p.status === "done" ? "SELESAI" : "ON PROGRESS"}]`);
  }
  if (cmd === "contact") {
    return ["email@perseus.dev", "github.com/perseus", "tiktok.com/@perseus"];
  }
  if (cmd === "sudo hire-me") {
    return ["Permission granted. ✦", "Perseus sedang terbuka untuk kolaborasi/kerja sama.", "Buka window Contact buat kirim pesan langsung!"];
  }
  if (cmd === "cv" || cmd === "resume") {
    if (typeof window !== "undefined") {
      window.open("/cv/perseus-cv.pdf", "_blank");
    }
    return ["Membuka CV di tab baru... 📄"];
  }
  if (cmd === "clear") {
    return { clear: true };
  }
  return [`command not found: ${cmd} — ketik 'help' untuk daftar command`];
}

export default function TerminalApp() {
  const [lines, setLines] = useState(BOOT_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [skills, setSkills] = useState(FALLBACK_SKILLS);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function handleSubmit(e) {
    e.preventDefault();
    const result = runCommand(input, projects, skills);

    if (result && result.clear) {
      setLines([]);
    } else {
      setLines((prev) => [...prev, `> ${input}`, ...result]);
    }

    if (input.trim() !== "") setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length && setProjects(d))
      .catch(() => {});
    fetch("/api/skills")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && d.length && setSkills(d))
      .catch(() => {});
  }, []);

  return (
    <div className="terminal p-2" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="terminal-input-row" onSubmit={handleSubmit}>
        <span className="terminal-prompt">$</span>
        <input ref={inputRef} className="terminal-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} autoFocus spellCheck={false} />
      </form>
    </div>
  );
}
