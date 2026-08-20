"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { turningAge } from "@/lib/birthday";
import { Typewriter } from "@/components/ui";
import Balloons from "@/components/Balloons";

export default function Hero({ started }: { started: boolean }) {
  const [age, setAge] = useState<number | null>(null);

  // turningAge() reads her local clock, so resolve it after mount.
  useEffect(() => setAge(turningAge()), []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {started && <Balloons />}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={started ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative font-sans text-xs uppercase tracking-[0.45em] text-champagne/80 sm:text-sm"
      >
        {content.hero.kicker}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={started ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-7 font-serif text-2xl italic text-pearl/85 sm:text-3xl"
      >
        {content.hero.greeting}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.92, filter: "blur(14px)" }}
        animate={started ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ delay: 1.2, duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-2 font-script text-7xl leading-tight text-gradient-gold sm:text-8xl md:text-9xl"
      >
        {content.hero.title}
      </motion.h1>

      {age !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={started ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2, duration: 1, type: "spring", bounce: 0.4 }}
          className="glass relative mt-6 rounded-full px-6 py-2 font-sans text-xs uppercase tracking-[0.3em] text-champagne"
        >
          {age} {content.birthday.section.turningLabel}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2.4, duration: 1.5 }}
        className="relative mt-8 h-8 max-w-xl font-serif text-lg italic text-pearl/85 sm:text-xl"
      >
        {started && <Typewriter lines={content.hero.typed} />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 3.4, duration: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-pearl/50">
          {content.hero.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-pearl/25 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-rosegold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
