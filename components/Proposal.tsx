"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { music } from "@/lib/music";
import Celebration from "@/components/Celebration";
import { WordReveal } from "@/components/ui";

const CrystalScene = dynamic(() => import("@/components/CrystalScene"), {
  ssr: false,
});

const MAX_DODGES = 4;

export default function Proposal({ onEnter }: { onEnter: (inView: boolean) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [answer, setAnswer] = useState<null | "yes" | "wait">(null);
  const [dodges, setDodges] = useState(0);
  const [dodgePos, setDodgePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    onEnter(inView);
  }, [inView, onEnter]);

  const dodge = () => {
    if (dodges >= MAX_DODGES) return;
    const arena = arenaRef.current?.getBoundingClientRect();
    const rangeX = arena ? Math.min(arena.width * 0.35, 190) : 160;
    setDodges((d) => d + 1);
    setDodgePos((prev) => {
      // Jump far enough that it always slips out from under the cursor
      const angle = Math.random() * Math.PI * 2;
      const dist = 160 + Math.random() * 80;
      let x = prev.x + Math.cos(angle) * dist;
      let y = prev.y + Math.sin(angle) * dist * 0.45;
      x = Math.max(-rangeX, Math.min(rangeX, x));
      y = Math.max(-70, Math.min(70, y));
      if (Math.hypot(x - prev.x, y - prev.y) < 110) {
        x = prev.x > 0 ? -rangeX : rangeX;
        y = -prev.y;
      }
      return { x, y };
    });
  };

  const sayYes = () => {
    setAnswer("yes");
    music.setMode("celebration");
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {inView && <Celebration mode={answer === "yes" ? "grand" : "soft"} />}

      {/* 3D crystal heart + ring */}
      <div className="relative h-[46vh] w-full max-w-3xl sm:h-[52vh]">
        <CrystalScene />
      </div>

      <AnimatePresence mode="wait">
        {answer === null && (
          <motion.div
            key="question"
            exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.9 }}
            className="relative z-40 -mt-10 text-center"
          >
            <WordReveal
              text={content.proposal.lead}
              stagger={0.18}
              className="font-serif text-xl italic text-pearl/80 sm:text-2xl"
            />
            <motion.h2
              initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient-gold glow-gold mt-6 font-script text-6xl leading-tight sm:text-8xl"
            >
              {content.proposal.question}
            </motion.h2>

            <div
              ref={arenaRef}
              className="relative mx-auto mt-12 flex min-h-[9rem] w-full max-w-xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10"
            >
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 1 }}
                onClick={sayYes}
                className="btn-yes rounded-full px-14 py-5 font-serif text-2xl font-semibold tracking-wide text-night"
              >
                {content.proposal.yes}
                <span className="ml-2" aria-hidden="true">♥</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <motion.button
                  animate={{ x: dodgePos.x, y: dodgePos.y }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  onMouseEnter={dodge}
                  onTouchStart={(e) => {
                    if (dodges < MAX_DODGES) {
                      e.preventDefault();
                      dodge();
                    }
                  }}
                  onClick={() => dodges >= MAX_DODGES && setAnswer("wait")}
                  className="glass rounded-full px-8 py-4 font-sans text-sm tracking-wide text-pearl/80 transition-colors hover:text-pearl"
                >
                  {dodges >= MAX_DODGES
                    ? content.proposal.notYet
                    : `${content.proposal.notYet} \u{1F60A}`}
                </motion.button>
              </motion.div>
            </div>
            {dodges > 0 && dodges < MAX_DODGES && answer === null && (
              <motion.p
                key={dodges}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className="mt-6 font-script text-xl text-rosegold"
              >
                {["it's shy...", "it really doesn't want to be picked...", "see? even the button knows...", "okay, okay — it will hold still now"][dodges - 1]}
              </motion.p>
            )}
          </motion.div>
        )}

        {answer === "yes" && (
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-40 -mt-6 max-w-3xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 1.1, times: [0, 0.6, 1], ease: "easeOut" }}
              className="mx-auto mb-8 h-20 w-20 text-rosegold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full drop-shadow-[0_0_30px_rgba(232,180,184,1)]" aria-hidden="true">
                <path d="M12 21s-6.7-4.35-9.33-8.11C.9 10.36 1.7 6.86 4.5 5.5c2.04-.99 4.46-.3 5.86 1.43L12 8.6l1.64-1.67c1.4-1.73 3.82-2.42 5.86-1.43 2.8 1.36 3.6 4.86 1.83 7.39C18.7 16.65 12 21 12 21z" />
              </svg>
            </motion.div>
            <h2 className="text-gradient-gold glow-gold font-serif text-4xl leading-snug sm:text-6xl">
              {content.proposal.yesResponse}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.5 }}
              className="mt-8 font-script text-4xl text-rosegold glow-soft sm:text-5xl"
            >
              forever begins now
            </motion.p>
          </motion.div>
        )}

        {answer === "wait" && (
          <motion.div
            key="wait"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-40 -mt-6 max-w-2xl text-center"
          >
            <h2 className="glow-soft font-serif text-3xl italic leading-relaxed text-pearl sm:text-5xl">
              I&apos;ll wait...
            </h2>
            <p className="mt-6 font-script text-3xl text-rosegold glow-soft sm:text-4xl">
              Because you&apos;re worth every second. ♥
            </p>
            <button
              onClick={() => {
                setAnswer(null);
                setDodges(0);
                setDodgePos({ x: 0, y: 0 });
              }}
              className="glass mt-10 rounded-full px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-champagne transition-transform hover:scale-105"
            >
              ask me again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
