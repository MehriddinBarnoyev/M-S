"use client";

import { useEffect, useRef } from "react";

type Spark = { x: number; y: number; vx: number; vy: number; life: number; hue: number; size: number };
type Bloom = { x: number; y: number; life: number; petals: number; hue: number };
type Heart = { x: number; y: number; vx: number; vy: number; size: number; phase: number; alpha: number };

function heartPath(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s, y - s * 0.6, x - s, y + s * 0.1);
  ctx.bezierCurveTo(x - s, y + s * 0.8, x, y + s * 1.1, x, y + s * 1.5);
  ctx.bezierCurveTo(x, y + s * 1.1, x + s, y + s * 0.8, x + s, y + s * 0.1);
  ctx.bezierCurveTo(x + s, y - s * 0.6, x, y, x, y + s * 0.3);
  ctx.closePath();
}

export default function CursorFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine) document.body.classList.add("fx-cursor");

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

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

    const sparks: Spark[] = [];
    const blooms: Bloom[] = [];
    const hearts: Heart[] = [];
    const heartCount = window.innerWidth < 640 ? 5 : 9;
    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.15 - Math.random() * 0.25,
        size: 5 + Math.random() * 8,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.35,
      });
    }

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const burst = (x: number, y: number) => {
      const n = reduced ? 6 : 22;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
        const speed = 1.5 + Math.random() * 3.5;
        sparks.push({
          x, y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 1,
          hue: Math.random() < 0.5 ? 42 : 350,
          size: 1 + Math.random() * 2,
        });
      }
      blooms.push({ x, y, life: 1, petals: 5 + Math.floor(Math.random() * 3), hue: Math.random() < 0.5 ? 340 : 25 });
    };

    const onClick = (e: MouseEvent) => burst(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) burst(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("resize", resize);

    let raf = 0;
    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Trailing ring
      ring.x += (mouse.x - ring.x) * 0.12;
      ring.y += (mouse.y - ring.y) * 0.12;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;

      // Ambient floating hearts, gently repelled by the cursor
      for (const hh of hearts) {
        const dx = hh.x - mouse.x;
        const dy = hh.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22500 && d2 > 1) {
          const d = Math.sqrt(d2);
          hh.vx += (dx / d) * 0.08;
          hh.vy += (dy / d) * 0.08;
        }
        hh.vx *= 0.98;
        hh.vy = hh.vy * 0.98 - 0.004;
        hh.x += hh.vx + Math.sin(t * 0.001 + hh.phase) * 0.3;
        hh.y += hh.vy;
        if (hh.y < -30) {
          hh.y = h + 30;
          hh.x = Math.random() * w;
          hh.vy = -0.15 - Math.random() * 0.25;
        }
        if (hh.x < -30) hh.x = w + 30;
        if (hh.x > w + 30) hh.x = -30;
        const pulse = 1 + Math.sin(t * 0.003 + hh.phase) * 0.1;
        ctx.save();
        ctx.globalAlpha = hh.alpha;
        ctx.shadowColor = "rgba(232, 180, 184, 0.9)";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "rgba(232, 180, 184, 0.9)";
        heartPath(ctx, hh.x, hh.y, hh.size * pulse * 0.5);
        ctx.fill();
        ctx.restore();
      }

      // Click sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.04;
        s.vx *= 0.97;
        s.vy *= 0.97;
        s.life -= 0.02;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 85%, 72%, ${s.life})`;
        ctx.shadowColor = `hsla(${s.hue}, 85%, 72%, ${s.life})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Blooming flowers
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i];
        b.life -= 0.012;
        if (b.life <= 0) {
          blooms.splice(i, 1);
          continue;
        }
        const grow = 1 - b.life;
        const r = grow * 26;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.globalAlpha = Math.min(1, b.life * 2);
        ctx.rotate(grow * 0.8);
        for (let p = 0; p < b.petals; p++) {
          ctx.save();
          ctx.rotate((Math.PI * 2 * p) / b.petals);
          ctx.beginPath();
          ctx.ellipse(0, -r * 0.6, r * 0.28, r * 0.62, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${b.hue}, 75%, 78%, 0.5)`;
          ctx.fill();
          ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(243, 217, 164, 0.85)";
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("fx-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[60]"
        aria-hidden="true"
      />
      {/* Custom cursor — only visible on fine pointers */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden [@media(pointer:fine)]:block"
        aria-hidden="true"
      >
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-pearl shadow-[0_0_12px_4px_rgba(243,217,164,0.6)]" />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden [@media(pointer:fine)]:block"
        aria-hidden="true"
      >
        <div className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-rosegold/40 bg-rosegold/5 blur-[1px]" />
      </div>
    </>
  );
}
