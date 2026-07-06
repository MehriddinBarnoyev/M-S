"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";

/**
 * Appears only if /public/audio/voice-message.mp3 exists.
 */
export default function VoiceMessage() {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(content.voiceMessage.src, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (r.ok && type.startsWith("audio")) setAvailable(true);
      })
      .catch(() => {});
  }, []);

  if (!available) return null;

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(content.voiceMessage.src);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section className="relative px-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass mx-auto flex max-w-md items-center gap-5 rounded-3xl p-6"
      >
        <button
          onClick={toggle}
          aria-label={playing ? "Ovozli xabarni to'xtatish" : "Ovozli xabarni tinglash"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rosegold to-champagne-deep shadow-[0_0_30px_rgba(232,180,184,0.4)] transition-transform hover:scale-110"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-night" fill="currentColor" aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 text-night" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div>
          <p className="font-serif text-lg italic text-pearl/90">
            {content.voiceMessage.label}
          </p>
          <div className="mt-2 flex h-4 items-end gap-[3px]" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full bg-rosegold/70 ${playing ? "animate-pulse" : ""}`}
                style={{
                  height: `${4 + Math.abs(Math.sin(i * 1.3)) * 12}px`,
                  animationDelay: `${i * 60}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
