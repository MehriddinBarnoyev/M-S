"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { content, type PhotoItem } from "@/lib/content";
import { SectionTitle } from "@/components/ui";

function Polaroid({ photo, index }: { photo: PhotoItem; index: number }) {
  const [missing, setMissing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 60, rotate: photo.rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay: (index % 3) * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="animate-floaty"
      style={{ animationDelay: `${index * 0.9}s`, perspective: 800 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="polaroid w-56 rounded-sm p-3 pb-4 sm:w-64"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-midnight-2">
          {!missing ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              onError={() => setMissing(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(140deg,#1a2145,#3a2634_60%,#4a3050)]">
              <svg viewBox="0 0 24 24" className="h-10 w-10 text-rosegold/70" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-6.7-4.35-9.33-8.11C.9 10.36 1.7 6.86 4.5 5.5c2.04-.99 4.46-.3 5.86 1.43L12 8.6l1.64-1.67c1.4-1.73 3.82-2.42 5.86-1.43 2.8 1.36 3.6 4.86 1.83 7.39C18.7 16.65 12 21 12 21z" />
              </svg>
              <span className="px-4 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-pearl/50">
                {content.photoStory.placeholder}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
        </div>
        <figcaption className="mt-3 text-center font-letter text-lg text-neutral-700">
          {photo.caption}
        </figcaption>
      </div>
    </motion.figure>
  );
}

export default function PhotoStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const photos = content.photos;

  return (
    <section ref={ref} className="relative px-6 py-28 sm:py-40">
      <SectionTitle script={content.photoStory.script} title={content.photoStory.title} />
      <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-8 sm:gap-12">
        {photos.map((photo, i) => (
          <motion.div key={photo.src} style={{ y: i % 2 === 0 ? yA : yB }}>
            <Polaroid photo={photo} index={i} />
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="mt-20 text-center font-serif text-lg italic text-pearl/70 sm:text-xl"
      >
        {content.photoStory.footer}
      </motion.p>
    </section>
  );
}
