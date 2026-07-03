"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { Typewriter } from "@/components/ui";

export default function Hero({ started }: { started: boolean }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={started ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="font-sans text-xs uppercase tracking-[0.45em] text-champagne/80 sm:text-sm"
      >
        {content.hero.kicker}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.92, filter: "blur(14px)" }}
        animate={started ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ delay: 1, duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-script text-7xl leading-tight text-gradient-gold sm:text-8xl md:text-9xl"
      >
        {content.hero.title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1.5 }}
        className="mt-8 h-8 max-w-xl font-serif text-lg italic text-pearl/85 sm:text-xl"
      >
        {started && <Typewriter lines={content.hero.typed} />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 3.2, duration: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-pearl/50">
          scroll into our story
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
