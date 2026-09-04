"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useWindowStore } from "@/store/useWindowStore";
import { useLanguage } from "@/hooks/useLanguage";

const GRID_SIZE = 14;
const CELL = 18;
const DIRS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
const INITIAL_SNAKE = [{ x: 6, y: 7 }];

function randomFood(snake) {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

export default function SnakeGame() {
  const { t } = useLanguage();
  const activeId = useWindowStore((s) => s.activeId);

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const dirRef = useRef({ x: 1, y: 0 });
  const pendingDirRef = useRef({ x: 1, y: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-os-snake-highscore");
    if (saved) setHighScore(parseInt(saved, 10) || 0);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (activeId !== "game") return;
      const newDir = DIRS[e.key];
      if (!newDir) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (newDir.x === -cur.x && newDir.y === -cur.y) return; // cegah balik arah 180°
      pendingDirRef.current = newDir;
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId]);

  const restart = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(randomFood(INITIAL_SNAKE));
    dirRef.current = { x: 1, y: 0 };
    pendingDirRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        dirRef.current = pendingDirRef.current;
        const head = prev[0];
        const newHead = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prev;
        }
        if (prev.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }

        const ate = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];
        if (!ate) {
          newSnake.pop();
        } else {
          setScore((s) => s + 1);
          setFood(randomFood(newSnake));
        }
        return newSnake;
      });
    }, 140);
    return () => clearInterval(interval);
  }, [gameOver, food]);

  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem("portfolio-os-snake-highscore", String(score));
    }
  }, [gameOver, score, highScore]);

  return (
    <div className="snake-game">
      <div className="snake-hud">
        <span>
          {t.gameScore}: {score}
        </span>
        <span>
          {t.gameBest}: {highScore}
        </span>
      </div>

      <div className="snake-board" style={{ width: GRID_SIZE * CELL, height: GRID_SIZE * CELL }}>
        {snake.map((seg, i) => (
          <div key={i} className={i === 0 ? "snake-head" : "snake-body"} style={{ left: seg.x * CELL, top: seg.y * CELL, width: CELL, height: CELL }} />
        ))}
        <div className="snake-food" style={{ left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL }} />

        {gameOver && (
          <div className="snake-overlay">
            <div className="snake-overlay-title">{t.gameOver}</div>
            <button className="snake-restart" onClick={restart}>
              {t.gameRestart}
            </button>
          </div>
        )}
      </div>

      <div className="snake-hint">{t.gameHint}</div>
    </div>
  );
}
