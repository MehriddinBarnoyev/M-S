"use client";

import { content } from "@/lib/content";
import { WordReveal } from "@/components/ui";

/**
 * Full-screen cinematic statements, revealed word by word
 * as she scrolls — like title cards in a film.
 */
export default function Messages() {
  return (
    <section className="relative">
      {content.messages.map((line, i) => (
        <div
          key={i}
          className="flex min-h-[70vh] items-center justify-center px-8 sm:min-h-[85vh]"
        >
          <WordReveal
            text={line}
            stagger={0.22}
            className={`max-w-3xl text-center font-serif leading-snug ${
              i === content.messages.length - 1
                ? "text-gradient-gold glow-gold text-4xl sm:text-6xl md:text-7xl"
                : "glow-soft text-3xl italic text-pearl/90 sm:text-5xl"
            }`}
          />
        </div>
      ))}
    </section>
  );
}
