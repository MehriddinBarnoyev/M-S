"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#e8b4b8", "#f3d9a4", "#f7c8d0", "#d4af6a", "#fdf6ee", "#c98a90"];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  life: number;
};

/**
 * A small, self-contained confetti canvas.
 *
 * `burst` fires one radial explosion from `origin` (viewport coordinates)
 * and calls `onDone` when the last piece has fallen; `rain` drifts pieces
 * down from the top for a couple of seconds. The canvas fills its parent,
 * so wrap it in a fixed layer for a page-wide burst or drop it straight
 * into a card for a contained one.
 */
export default function Confetti({
  mode = "burst",
  origin,
  count = 70,
  onDone,
}: {
  mode?: "burst" | "rain";
  origin?: { x: number; y: number } | null;
  count?: number;
  onDone?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      doneRef.current?.();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let originX = 0;
    let originY = 0;

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // `origin` arrives in viewport coordinates — bring it into canvas space.
      originX = origin ? origin.x - rect.left : w / 2;
      originY = origin ? origin.y - rect.top : h / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const pieces: Piece[] = [];

    const spawnBurst = () => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 2.6 * (0.35 + Math.random());
        pieces.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.2,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.32,
          w: 5 + Math.random() * 7,
          h: 8 + Math.random() * 8,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          life: 1,
        });
      }
    };

    const spawnRainPiece = () => {
      pieces.push({
        x: Math.random() * w,
        y: -14,
        vx: (Math.random() - 0.5) * 0.9,
        vy: 1.1 + Math.random() * 1.5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.22,
        w: 4 + Math.random() * 6,
        h: 7 + Math.random() * 7,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1,
      });
    };

    if (mode === "burst") spawnBurst();

    let raf = 0;
    let elapsed = 0;
    let last = 0;
    const RAIN_MS = 2600;

    const frame = (t: number) => {
      if (!last) last = t;
      elapsed += t - last;
      last = t;

      if (mode === "rain" && elapsed < RAIN_MS && pieces.length < 160) {
        spawnRainPiece();
        if (Math.random() > 0.5) spawnRainPiece();
      }

      ctx.clearRect(0, 0, w, h);

      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.vy += 0.055; // gravity
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > h + 30) p.life = 0;
        if (mode === "burst" && p.y > h * 0.9) p.life -= 0.02;

        if (p.life <= 0) {
          pieces.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        // A squashed rectangle reads as a fluttering paper strip.
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot)));
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      const finished =
        pieces.length === 0 && (mode === "burst" || elapsed >= RAIN_MS);
      if (finished) {
        doneRef.current?.();
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [mode, origin, count]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
