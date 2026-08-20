"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { isTheDayItself, nextBirthday, remainingUntil, type Elapsed } from "@/lib/birthday";

/**
 * Counts down to her next birthday. On the day itself it still counts —
 * a full year ahead — with a small badge saying today is the one.
 */
export default function Countdown() {
  const c = content.countdown;
  const [parts, setParts] = useState<Elapsed | null>(null);
  const [today, setToday] = useState(false);

  useEffect(() => {
    setToday(isTheDayItself());
    const target = nextBirthday();
    const update = () => setParts(remainingUntil(target));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { value: parts?.days, label: c.labels.days },
    { value: parts?.hours, label: c.labels.hours },
    { value: parts?.minutes, label: c.labels.minutes },
    { value: parts?.seconds, label: c.labels.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl"
    >
      {today && (
        <p className="mb-4 text-center font-sans text-[11px] uppercase tracking-[0.3em] text-champagne/80">
          {c.todayLead}
        </p>
      )}

      <p className="mb-6 text-center font-script text-2xl text-rosegold glow-soft sm:text-3xl">
        {c.lead}
      </p>

      <div className="grid grid-cols-4 gap-3 sm:gap-5">
        {cells.map((cell) => (
          <div key={cell.label} className="glass rounded-2xl px-2 py-5 text-center sm:py-7">
            <div className="font-serif text-3xl tabular-nums text-gradient-gold sm:text-5xl">
              {cell.value ?? "—"}
            </div>
            <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/60 sm:text-xs">
              {cell.label}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center font-sans text-sm tracking-wide text-pearl/60">
        {today ? c.todayNote : c.note}
      </p>
    </motion.div>
  );
}
