"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; phase: number; speed: number; depth: number };
type Firefly = { x: number; y: number; vx: number; vy: number; phase: number };
type Petal = { x: number; y: number; vy: number; sway: number; phase: number; size: number; spin: number; angle: number };
type Butterfly = { x: number; y: number; t: number; speed: number; amp: number; hue: number };
type Shooting = { x: number; y: number; vx: number; vy: number; life: number } | null;

export default function NightSky({ boost = false }: { boost?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boostRef = useRef(boost);
  boostRef.current = boost;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let brightness = 0;

    const mouse = { x: 0.5, y: 0.5 };
    const stars: Star[] = [];
    const flies: Firefly[] = [];
    const petals: Petal[] = [];
    const butterflies: Butterfly[] = [];
    let shooting: Shooting = null;
    let nextShot = performance.now() + 4000 + Math.random() * 6000;

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

    const seed = () => {
      stars.length = 0;
      const count = Math.min(220, Math.floor((w * h) / 7000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.2,
          depth: 0.3 + Math.random() * 0.7,
        });
      }
      const mobile = w < 640;
      flies.length = 0;
      for (let i = 0; i < (mobile ? 7 : 12); i++) {
        flies.push({
          x: Math.random() * w,
          y: h * 0.3 + Math.random() * h * 0.65,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
      petals.length = 0;
      for (let i = 0; i < (mobile ? 9 : 16); i++) {
        petals.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vy: 0.3 + Math.random() * 0.5,
          sway: 24 + Math.random() * 36,
          phase: Math.random() * Math.PI * 2,
          size: 5 + Math.random() * 7,
          spin: (Math.random() - 0.5) * 0.02,
          angle: Math.random() * Math.PI * 2,
        });
      }
      butterflies.length = 0;
      for (let i = 0; i < (mobile ? 2 : 4); i++) {
        butterflies.push({
          x: Math.random() * w,
          y: h * 0.25 + Math.random() * h * 0.5,
          t: Math.random() * 1000,
          speed: 0.25 + Math.random() * 0.3,
          amp: 30 + Math.random() * 50,
          hue: Math.random() < 0.5 ? 340 : 45,
        });
      }
    };
    seed();

    const onResize = () => {
      resize();
      seed();
    };
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / w;
      mouse.y = e.clientY / h;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });

    const drawPetal = (p: Petal, t: number) => {
      const x = p.x + Math.sin(t * 0.001 + p.phase) * p.sway * 0.4;
      ctx.save();
      ctx.translate(x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size, -p.size * 0.9, p.size * 1.4, p.size * 0.4, 0, p.size);
      ctx.bezierCurveTo(-p.size * 1.4, p.size * 0.4, -p.size, -p.size * 0.9, 0, 0);
      const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
      grad.addColorStop(0, "rgba(232, 160, 170, 0.5)");
      grad.addColorStop(1, "rgba(190, 100, 115, 0.35)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const drawButterfly = (b: Butterfly, t: number) => {
      const flap = Math.sin(t * 0.02 + b.t) * 0.7;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = 0.75;
      ctx.shadowColor = `hsla(${b.hue}, 80%, 75%, 0.9)`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = `hsla(${b.hue}, 85%, 78%, 0.85)`;
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * (0.55 + Math.abs(flap) * 0.45), 1);
        ctx.beginPath();
        ctx.ellipse(4, -2, 5, 3.4, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(3.4, 2.4, 3.6, 2.6, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const target = boostRef.current ? 1 : 0;
      brightness += (target - brightness) * 0.02;

      const px = (mouse.x - 0.5) * 24;
      const py = (mouse.y - 0.5) * 16;

      // Stars
      for (const s of stars) {
        const tw = 0.45 + 0.55 * Math.sin(t * 0.001 * s.speed + s.phase);
        const a = tw * (0.5 + brightness * 0.5) * s.depth;
        ctx.beginPath();
        ctx.arc(s.x - px * s.depth, s.y - py * s.depth, s.r * (1 + brightness * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 250, 235, ${a})`;
        ctx.fill();
        if (s.r > 1.3) {
          ctx.beginPath();
          ctx.arc(s.x - px * s.depth, s.y - py * s.depth, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 246, 214, ${a * 0.12})`;
          ctx.fill();
        }
      }

      if (!reduced) {
        // Shooting star
        if (!shooting && t > nextShot) {
          shooting = {
            x: Math.random() * w * 0.7 + w * 0.15,
            y: Math.random() * h * 0.25,
            vx: -(4 + Math.random() * 4),
            vy: 2 + Math.random() * 2,
            life: 1,
          };
          nextShot = t + 5000 + Math.random() * 9000;
        }
        if (shooting) {
          shooting.x += shooting.vx;
          shooting.y += shooting.vy;
          shooting.life -= 0.016;
          const grad = ctx.createLinearGradient(
            shooting.x, shooting.y,
            shooting.x - shooting.vx * 14, shooting.y - shooting.vy * 14
          );
          grad.addColorStop(0, `rgba(255, 250, 235, ${shooting.life * 0.9})`);
          grad.addColorStop(1, "rgba(255, 250, 235, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(shooting.x - shooting.vx * 14, shooting.y - shooting.vy * 14);
          ctx.stroke();
          if (shooting.life <= 0) shooting = null;
        }

        // Fireflies — drawn to drift and faintly chase the cursor
        for (const f of flies) {
          f.vx += (Math.random() - 0.5) * 0.03 + (mouse.x * w - f.x) * 0.000012;
          f.vy += (Math.random() - 0.5) * 0.03 + (mouse.y * h - f.y) * 0.000012;
          f.vx = Math.max(-0.5, Math.min(0.5, f.vx));
          f.vy = Math.max(-0.4, Math.min(0.4, f.vy));
          f.x = (f.x + f.vx + w) % w;
          f.y = (f.y + f.vy + h) % h;
          const pulse = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.002 + f.phase));
          ctx.beginPath();
          ctx.arc(f.x, f.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(243, 217, 164, ${pulse})`;
          ctx.shadowColor = "rgba(243, 217, 164, 0.9)";
          ctx.shadowBlur = 10 * pulse;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Petals
        for (const p of petals) {
          p.y += p.vy;
          p.angle += p.spin;
          if (p.y > h + 20) {
            p.y = -20;
            p.x = Math.random() * w;
          }
          drawPetal(p, t);
        }

        // Butterflies
        for (const b of butterflies) {
          b.t += 0.01;
          b.x += Math.cos(b.t * b.speed) * 0.7;
          b.y += Math.sin(b.t * b.speed * 1.6) * 0.5 - 0.05;
          if (b.x < -20) b.x = w + 20;
          if (b.x > w + 20) b.x = -20;
          if (b.y < h * 0.1) b.y = h * 0.8;
          drawButterfly(b, t);
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Deep gradient night */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#131b3a_0%,#0b1026_45%,#050510_100%)]" />
      {/* Aurora */}
      <div className="aurora" />
      {/* Drifting clouds */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-[8%] h-[30vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse,rgba(120,140,200,0.16),transparent_70%)] blur-3xl"
          style={{ animation: "cloud-a 90s linear infinite" }}
        />
        <div
          className="absolute top-[30%] h-[24vh] w-[55vw] rounded-full bg-[radial-gradient(ellipse,rgba(200,160,180,0.12),transparent_70%)] blur-3xl"
          style={{ animation: "cloud-b 120s linear infinite" }}
        />
      </div>
      {/* Moon */}
      <div className="moon absolute right-[8%] top-[7%] h-16 w-16 rounded-full sm:h-24 sm:w-24" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <style jsx>{`
        @keyframes cloud-a {
          from { transform: translateX(-40vw); }
          to { transform: translateX(110vw); }
        }
        @keyframes cloud-b {
          from { transform: translateX(110vw); }
          to { transform: translateX(-60vw); }
        }
      `}</style>
    </div>
  );
}
