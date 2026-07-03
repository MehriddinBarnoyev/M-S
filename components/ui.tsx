"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Reveals text word by word when scrolled into view. */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.14,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

/** Types out a rotating list of lines, one character at a time. */
export function Typewriter({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!inView) return;
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = lines[line % lines.length];
      if (!deleting) {
        char++;
        setDisplay(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, 2600);
          return;
        }
        timer = setTimeout(tick, 45 + Math.random() * 50);
      } else {
        char--;
        setDisplay(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          line++;
          timer = setTimeout(tick, 500);
          return;
        }
        timer = setTimeout(tick, 18);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [inView, lines]);

  return (
    <span ref={ref} className={className}>
      {display}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-rosegold align-middle" style={{ height: "1em" }} />
    </span>
  );
}

/** Elegant fading section heading with script accent. */
export function SectionTitle({
  script,
  title,
}: {
  script: string;
  title: string;
}) {
  return (
    <div className="relative z-10 mb-14 text-center sm:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="font-script text-3xl text-rosegold glow-soft sm:text-4xl"
      >
        {script}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2 font-serif text-4xl font-medium tracking-wide text-pearl sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-champagne/70 to-transparent"
      />
    </div>
  );
}
