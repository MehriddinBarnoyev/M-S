"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { SectionTitle } from "@/components/ui";

export default function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative px-6 py-28 sm:py-40">
      <SectionTitle script={content.letter.script} title={content.letter.title} />

      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              onClick={() => setOpen(true)}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative outline-none"
              aria-label="Xatni ochish"
              style={{ perspective: 1000 }}
            >
              {/* Envelope body */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="relative h-52 w-80 sm:h-60 sm:w-96"
              >
                <div className="absolute inset-0 rounded-xl bg-[linear-gradient(150deg,#f6ecd9,#e5d3b3)] shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_60px_rgba(243,217,164,0.15)]" />
                {/* Flap */}
                <div
                  className="absolute left-0 right-0 top-0 h-1/2 origin-top transition-transform duration-700 group-hover:[transform:rotateX(28deg)]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 96%)",
                    background: "linear-gradient(160deg, #ecd9b8, #d8c096)",
                    transformStyle: "preserve-3d",
                  }}
                />
                {/* Wax seal */}
                <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d98a92,#a34a56_70%)] shadow-[0_4px_14px_rgba(120,40,50,0.6)] transition-transform duration-500 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-pearl/90" fill="currentColor" aria-hidden="true">
                    <path d="M12 21s-6.7-4.35-9.33-8.11C.9 10.36 1.7 6.86 4.5 5.5c2.04-.99 4.46-.3 5.86 1.43L12 8.6l1.64-1.67c1.4-1.73 3.82-2.42 5.86-1.43 2.8 1.36 3.6 4.86 1.83 7.39C18.7 16.65 12 21 12 21z" />
                  </svg>
                </div>
              </motion.div>
              <p className="mt-8 text-center font-sans text-xs uppercase tracking-[0.35em] text-champagne/80 transition-colors group-hover:text-champagne">
                {content.letter.cta}
              </p>
            </motion.button>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 120, rotateX: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="letter-paper relative w-full rounded-lg px-8 py-12 text-neutral-800 sm:px-14 sm:py-16"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Deckled top edge */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-champagne-deep/40 to-transparent" />
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.9, delayChildren: 0.6 }}
              >
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
                  className="font-letter text-3xl text-[#8a4a54] sm:text-4xl"
                >
                  {content.letter.greeting}
                </motion.p>
                {content.letter.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 1.1 } } }}
                    className="mt-6 font-letter text-xl leading-relaxed text-neutral-700 sm:text-2xl"
                  >
                    {p}
                  </motion.p>
                ))}
                <motion.div
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2 } } }}
                  className="mt-10 text-right"
                >
                  <p className="font-letter text-xl text-neutral-600">{content.letter.signoff}</p>
                  <p className="mt-1 font-script text-4xl text-[#8a4a54] sm:text-5xl">
                    {content.letter.signature}
                  </p>
                </motion.div>
              </motion.div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
