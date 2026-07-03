"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";

const SPOTS = [
  { top: "18%", left: "6%" },
  { top: "52%", right: "5%" },
  { top: "78%", left: "8%" },
];

/**
 * Tiny secret hearts pinned to the edges of the page.
 * Finding and tapping one reveals a hidden note.
 */
export default function HiddenHearts() {
  const [found, setFound] = useState<number | null>(null);
  const [collected, setCollected] = useState<Set<number>>(new Set());

  return (
    <>
      {content.secrets.map((_, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: collected.has(i) ? 0 : 0.35 }}
          whileHover={{ opacity: 1, scale: 1.4 }}
          transition={{ duration: 0.4 }}
          onClick={() => {
            setFound(i);
            setCollected((prev) => new Set(prev).add(i));
          }}
          className="fixed z-40 h-6 w-6 text-rosegold"
          style={SPOTS[i % SPOTS.length]}
          aria-label="A hidden secret"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full drop-shadow-[0_0_8px_rgba(232,180,184,0.9)]" aria-hidden="true">
            <path d="M12 21s-6.7-4.35-9.33-8.11C.9 10.36 1.7 6.86 4.5 5.5c2.04-.99 4.46-.3 5.86 1.43L12 8.6l1.64-1.67c1.4-1.73 3.82-2.42 5.86-1.43 2.8 1.36 3.6 4.86 1.83 7.39C18.7 16.65 12 21 12 21z" />
          </svg>
        </motion.button>
      ))}

      <AnimatePresence>
        {found !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
            onClick={() => setFound(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
              className="glass max-w-sm rounded-3xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-script text-3xl text-rosegold glow-soft">shhh...</p>
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-pearl/90">
                {content.secrets[found]}
              </p>
              <button
                onClick={() => setFound(null)}
                className="glass mt-7 rounded-full px-7 py-2.5 font-sans text-xs uppercase tracking-[0.25em] text-champagne transition-transform hover:scale-105"
              >
                keep it between us
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
