"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { content } from "@/lib/content";
import { SectionTitle } from "@/components/ui";

/** A lit candle marks each chapter of her story. */
function CandleMark() {
  return (
    <div className="relative z-10 flex h-10 w-10 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-champagne/20 blur-md" />
      <div className="glass flex h-10 w-10 items-center justify-center rounded-full border-champagne/30">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-champagne" fill="currentColor" aria-hidden="true">
          {/* flame */}
          <path d="M12 2c1.9 2.2 3.2 3.9 3.2 5.6a3.2 3.2 0 1 1-6.4 0C8.8 5.9 10.1 4.2 12 2z" />
          {/* candle body */}
          <rect x="10.2" y="11.4" width="3.6" height="10.6" rx="1.1" opacity="0.75" />
        </svg>
      </div>
    </div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative px-6 py-28 sm:py-40">
      <SectionTitle script={content.timeline.script} title={content.timeline.title} />

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* Growing spine */}
        <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-champagne via-rosegold to-champagne shadow-[0_0_12px_rgba(232,180,184,0.6)] sm:left-1/2"
        />

        <div className="space-y-20 sm:space-y-28">
          {content.timeline.items.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={item.title}
                className={`relative flex items-start gap-6 pl-0 sm:gap-0 ${
                  left ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.45 }}
                  >
                    <CandleMark />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: left ? -60 : 60, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`glass ml-16 w-full rounded-3xl p-7 sm:ml-0 sm:w-[calc(50%-3.5rem)] sm:p-8 ${
                    left ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                  }`}
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-champagne/80">
                    {item.date}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-pearl sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm font-light leading-relaxed text-pearl/70 sm:text-base">
                    {item.text}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
