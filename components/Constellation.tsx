"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { SectionTitle } from "@/components/ui";

const STAR_COUNT = 24;

/** Parametric heart, scaled into a canvas box. */
function heartPoint(t: number, cx: number, cy: number, scale: number) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: cx + x * scale, y: cy - y * scale };
}

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: { x: number; y: number; lit: boolean; phase: number }[] = [];
    let progress = 0; // how much of the connecting path is drawn
    let finishedAt = 0;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.min(w, h) / 40;
      const wasLit = stars.map((s) => s.lit);
      stars = Array.from({ length: STAR_COUNT }, (_, i) => {
        const t = (Math.PI * 2 * i) / STAR_COUNT;
        const p = heartPoint(t + Math.PI, w / 2, h / 2 - h * 0.03, scale);
        return {
          x: p.x,
          y: p.y,
          lit: wasLit[i] ?? false,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };
    build();
    window.addEventListener("resize", build);

    const lightNear = (mx: number, my: number, radius: number) => {
      let changed = false;
      for (const s of stars) {
        if (!s.lit && (s.x - mx) ** 2 + (s.y - my) ** 2 < radius * radius) {
          s.lit = true;
          changed = true;
        }
      }
      if (changed) setLitCount(stars.filter((s) => s.lit).length);
    };

    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };
    const onMove = (e: MouseEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      lightNear(p.x, p.y, 46);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const p = toLocal(t.clientX, t.clientY);
      lightNear(p.x, p.y, 60);
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchstart", onTouch, { passive: true });

    let raf = 0;
    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const allLit = stars.length > 0 && stars.every((s) => s.lit);
      if (allLit && !finishedAt) {
        finishedAt = t;
        setDone(true);
      }
      if (allLit) progress = Math.min(1, progress + 0.008);

      // Connecting path
      if (progress > 0) {
        const segs = Math.floor(progress * STAR_COUNT);
        ctx.beginPath();
        ctx.moveTo(stars[0].x, stars[0].y);
        for (let i = 1; i <= segs; i++) {
          const s = stars[i % STAR_COUNT];
          ctx.lineTo(s.x, s.y);
        }
        ctx.strokeStyle = "rgba(243, 217, 164, 0.8)";
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "rgba(232, 180, 184, 0.9)";
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (progress >= 1) {
          const pulse = 0.10 + 0.06 * Math.sin(t * 0.002);
          ctx.beginPath();
          ctx.moveTo(stars[0].x, stars[0].y);
          for (let i = 1; i <= STAR_COUNT; i++) {
            const s = stars[i % STAR_COUNT];
            ctx.lineTo(s.x, s.y);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(232, 180, 184, ${pulse})`;
          ctx.fill();
        }
      }

      // Stars
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * 0.0025 + s.phase);
        if (s.lit) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 250, 235, 0.95)";
          ctx.shadowColor = "rgba(243, 217, 164, 1)";
          ctx.shadowBlur = 16;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(210, 215, 240, ${0.4 + tw * 0.45})`;
          ctx.shadowColor = "rgba(210, 215, 240, 0.7)";
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Gift: if she hasn't finished after a while, the sky helps her.
    const helper = setInterval(() => {
      const unlit = stars.filter((s) => !s.lit);
      if (unlit.length > 0 && stars.some((s) => s.lit)) {
        unlit[0].lit = true;
        setLitCount(stars.filter((s) => s.lit).length);
      }
    }, 2500);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(helper);
      window.removeEventListener("resize", build);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <section className="relative px-6 py-28 sm:py-36">
      <SectionTitle script={content.stars.script} title={content.stars.title} />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mx-auto -mt-8 mb-8 max-w-md text-center font-sans text-sm font-light text-pearl/60"
      >
        {content.stars.hint}
      </motion.p>

      <div
        ref={wrapRef}
        className="glass relative mx-auto h-[420px] max-w-3xl overflow-hidden rounded-[2rem] sm:h-[520px]"
      >
        <canvas ref={canvasRef} className="absolute inset-0 touch-none" />
        {!done && litCount > 0 && (
          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-pearl/50">
            {litCount} / {STAR_COUNT} {content.stars.counter}
          </div>
        )}
        {done && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 1.2 }}
            className="pointer-events-none absolute bottom-6 left-0 right-0 text-center font-script text-2xl text-rosegold glow-soft sm:text-3xl"
          >
            {content.stars.reveal}
          </motion.p>
        )}
      </div>
    </section>
  );
}
