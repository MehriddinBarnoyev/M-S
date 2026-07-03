"use client";

import { useEffect, useRef } from "react";

type Rocket = { x: number; y: number; vy: number; targetY: number; hue: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; hue: number; size: number };
type Confetti = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; w: number; h: number; hue: number };
type Balloon = { x: number; y: number; vy: number; sway: number; phase: number; hue: number; size: number };

/**
 * Fireworks / confetti / balloons overlay.
 * mode "soft"  — occasional gentle fireworks behind the question
 * mode "grand" — full celebration after she says yes
 */
export default function Celebration({ mode }: { mode: "soft" | "grand" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const confetti: Confetti[] = [];
    const balloons: Balloon[] = [];
    const HUES = [350, 42, 320, 200, 28];

    let lastLaunch = 0;
    let grandStarted = false;

    const explode = (x: number, y: number, hue: number, big: boolean) => {
      const n = big ? 70 : 36;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.2;
        const speed = (big ? 3.4 : 2.2) * (0.4 + Math.random() * 0.8);
        sparks.push({
          x, y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 1,
          hue: hue + (Math.random() - 0.5) * 30,
          size: 1 + Math.random() * 1.8,
        });
      }
    };

    const spawnGrandExtras = () => {
      const confettiCount = w < 640 ? 50 : 90;
      const balloonCount = w < 640 ? 6 : 10;
      for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          x: Math.random() * w,
          y: -20 - Math.random() * h * 0.5,
          vx: (Math.random() - 0.5) * 1.4,
          vy: 1.2 + Math.random() * 2.2,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.2,
          w: 5 + Math.random() * 6,
          h: 8 + Math.random() * 8,
          hue: HUES[i % HUES.length],
        });
      }
      for (let i = 0; i < balloonCount; i++) {
        balloons.push({
          x: (w / (balloonCount + 1)) * (i + 0.5) + (Math.random() - 0.5) * 40,
          y: h + 60 + Math.random() * 300,
          vy: -(0.8 + Math.random() * 0.8),
          sway: 20 + Math.random() * 26,
          phase: Math.random() * Math.PI * 2,
          hue: HUES[i % HUES.length],
          size: 22 + Math.random() * 14,
        });
      }
    };

    let raf = 0;
    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const grand = modeRef.current === "grand";
      if (grand && !grandStarted) {
        grandStarted = true;
        if (!reduced) spawnGrandExtras();
        for (let i = 0; i < 5; i++) {
          explode(
            w * (0.2 + Math.random() * 0.6),
            h * (0.15 + Math.random() * 0.35),
            HUES[i % HUES.length],
            true
          );
        }
      }

      // Launch rockets
      const interval = grand ? 700 : 2600;
      if (!reduced && t - lastLaunch > interval + Math.random() * interval) {
        lastLaunch = t;
        rockets.push({
          x: w * (0.15 + Math.random() * 0.7),
          y: h,
          vy: -(6 + Math.random() * 3),
          targetY: h * (0.12 + Math.random() * 0.3),
          hue: HUES[Math.floor(Math.random() * HUES.length)],
        });
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${r.hue}, 90%, 80%, 0.9)`;
        ctx.shadowColor = `hsla(${r.hue}, 90%, 70%, 1)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.hue, grand);
          rockets.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.028;
        s.vx *= 0.985;
        s.vy *= 0.985;
        s.life -= grand ? 0.008 : 0.011;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = s.life;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 90%, 74%, 1)`;
        ctx.shadowColor = `hsla(${s.hue}, 90%, 70%, 1)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      for (let i = confetti.length - 1; i >= 0; i--) {
        const c = confetti[i];
        c.x += c.vx + Math.sin(t * 0.002 + c.rot) * 0.6;
        c.y += c.vy;
        c.rot += c.vr;
        if (c.y > h + 30) {
          confetti.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);
        ctx.scale(1, Math.sin(t * 0.008 + c.rot));
        ctx.fillStyle = `hsla(${c.hue}, 85%, 70%, 0.9)`;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      }

      for (const b of balloons) {
        b.y += b.vy;
        if (b.y < -120) {
          b.y = h + 80;
          b.x = Math.random() * w;
        }
        const x = b.x + Math.sin(t * 0.001 + b.phase) * b.sway * 0.3;
        ctx.save();
        // string
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, b.y + b.size);
        ctx.quadraticCurveTo(x + 6, b.y + b.size + 24, x, b.y + b.size + 46);
        ctx.stroke();
        // body
        const grad = ctx.createRadialGradient(
          x - b.size * 0.3, b.y - b.size * 0.35, b.size * 0.1,
          x, b.y, b.size
        );
        grad.addColorStop(0, `hsla(${b.hue}, 80%, 82%, 0.95)`);
        grad.addColorStop(1, `hsla(${b.hue}, 70%, 58%, 0.85)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(x, b.y, b.size * 0.82, b.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
    />
  );
}
