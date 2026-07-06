"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];
const WD_SHORT = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"]; // Monday-first
const WD_LONG = [
  "Yakshanba", "Dushanba", "Seshanba", "Chorshanba",
  "Payshanba", "Juma", "Shanba",
]; // indexed by Date.getDay() (Sun=0)

export default function DateCalendar({ onPick }: { onPick: (label: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<Date | null>(null);

  const first = new Date(view.y, view.m, 1);
  const startOffset = (first.getDay() + 6) % 7; // shift so Monday is column 0
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d));

  const atCurrentMonth =
    view.y === today.getFullYear() && view.m === today.getMonth();

  const prevMonth = () => {
    if (atCurrentMonth) return; // never go into the past
    setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }));
  };
  const nextMonth = () =>
    setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }));

  const isPast = (d: Date) => d < today;
  const isSelected = (d: Date) =>
    selected != null && d.getTime() === selected.getTime();

  const confirm = () => {
    if (!selected) return;
    onPick(`${WD_LONG[selected.getDay()]}, ${selected.getDate()}-${MONTHS[selected.getMonth()]}`);
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="glass rounded-3xl px-5 py-6">
        {/* Header: month + navigation */}
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={prevMonth}
            disabled={atCurrentMonth}
            aria-label="Oldingi oy"
            className="rounded-full px-3 py-1 text-pearl/70 transition-colors enabled:hover:text-rosegold disabled:cursor-not-allowed disabled:opacity-25"
          >
            ‹
          </button>
          <p className="font-serif text-lg tracking-wide text-pearl">
            {MONTHS[view.m]} <span className="text-rosegold">{view.y}</span>
          </p>
          <button
            onClick={nextMonth}
            aria-label="Keyingi oy"
            className="rounded-full px-3 py-1 text-pearl/70 transition-colors hover:text-rosegold"
          >
            ›
          </button>
        </div>

        {/* Weekday row */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {WD_SHORT.map((w) => (
            <span
              key={w}
              className="text-center font-sans text-[0.65rem] uppercase tracking-widest text-champagne/70"
            >
              {w}
            </span>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={`e${i}`} />;
            const past = isPast(d);
            const sel = isSelected(d);
            return (
              <motion.button
                key={d.toISOString()}
                whileTap={past ? undefined : { scale: 0.88 }}
                disabled={past}
                onClick={() => setSelected(d)}
                className={[
                  "relative flex h-9 items-center justify-center rounded-full font-serif text-sm transition-all",
                  past
                    ? "cursor-not-allowed text-pearl/20"
                    : sel
                    ? "bg-rosegold font-semibold text-night shadow-[0_0_18px_rgba(232,180,184,0.7)]"
                    : "text-pearl/85 hover:bg-white/10 hover:text-pearl",
                ].join(" ")}
              >
                {d.getDate()}
                {sel && (
                  <span className="pointer-events-none absolute -top-1 -right-0 text-[0.6rem]" aria-hidden="true">
                    ♥
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Confirm — appears once a day is chosen */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-6 text-center"
          >
            <p className="mb-4 font-script text-2xl text-rosegold glow-soft">
              {WD_LONG[selected.getDay()]}, {selected.getDate()}-{MONTHS[selected.getMonth()]} 💛
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={confirm}
              className="btn-yes rounded-full px-10 py-3 font-serif text-lg font-semibold text-night"
            >
              Shu kunni belgilayman
              <span className="ml-2" aria-hidden="true">♥</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
