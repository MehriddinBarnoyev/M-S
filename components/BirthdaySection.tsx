"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import {
  daysLived,
  elapsedSince,
  isTheDayItself,
  startOfToday,
  turningAge,
} from "@/lib/birthday";
import { drawBirthdayCard, downloadBlob } from "@/lib/card";
import { notify } from "@/lib/telegram";
import { SectionTitle } from "@/components/ui";
import WishBox from "@/components/WishBox";
import Confetti from "@/components/Confetti";
import Balloons, { CARD_BALLOONS } from "@/components/Balloons";

/**
 * Her birthday section: a live counter for the day, eight gift boxes,
 * a wish box that reaches you, and a card she can keep.
 */
export default function BirthdaySection() {
  const s = content.birthday.section;

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <SectionTitle script={s.script} title={s.title} />

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        className="mx-auto -mt-6 max-w-xl text-center font-serif text-lg italic leading-relaxed text-pearl/80"
      >
        {s.lead}
      </motion.p>

      <BirthdayCounter />
      <GiftBoxes />
      <WishBox />
      <CardKeepsake />
    </section>
  );
}

/* ── Live counter ─────────────────────────────────────────── */

function BirthdayCounter() {
  const s = content.birthday.section;
  const [parts, setParts] = useState<ReturnType<typeof elapsedSince> | null>(null);
  const [lived, setLived] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  // The "how long today has been running" clock only makes sense on the
  // day itself; every other day of the year it would just be noise.
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    setIsToday(isTheDayItself());
    setAge(turningAge());
    const from = startOfToday();
    const update = () => {
      setParts(elapsedSince(from));
      setLived(daysLived());
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { value: parts?.hours, label: "soat" },
    { value: parts?.minutes, label: "daqiqa" },
    { value: parts?.seconds, label: "soniya" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-14 max-w-2xl"
    >
      {age !== null && (
        <p className="mb-6 text-center font-script text-3xl text-rosegold glow-soft sm:text-4xl">
          {age} {s.turningLabel}
        </p>
      )}

      {isToday && (
        <>
          <p className="mb-5 text-center font-sans text-[11px] uppercase tracking-[0.3em] text-pearl/55">
            {s.todayLabel}
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {cells.map((c) => (
              <div key={c.label} className="glass rounded-2xl px-2 py-5 text-center sm:py-7">
                <div className="font-serif text-3xl tabular-nums text-gradient-gold sm:text-5xl">
                  {c.value ?? "—"}
                </div>
                <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.25em] text-pearl/60 sm:text-xs">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {lived !== null && (
        <p className="mt-6 text-center font-serif text-base italic text-pearl/70">
          {s.livedLabel}{" "}
          <span className="text-solid-gold tabular-nums">{lived.toLocaleString("ru-RU")}</span>{" "}
          {s.livedUnit} {s.livedTail}
        </p>
      )}
    </motion.div>
  );
}

/* ── Eight gift boxes ─────────────────────────────────────── */

function GiftBoxes() {
  const gifts = content.birthday.gifts;
  const [open, setOpen] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());
  // One confetti burst at a time, keyed so a re-tap restarts the animation.
  const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null);
  const [finale, setFinale] = useState(false);
  const burstId = useRef(0);

  const openGift = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    burstId.current += 1;
    setBurst({
      id: burstId.current,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setOpen(i);
    setOpened((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev).add(i);
      if (next.size === gifts.length) {
        notify(`🎁 <b>Dilnura</b> — ${content.birthday.giftAllOpened}`);
        setFinale(true);
      }
      return next;
    });
  };

  // The all-eight celebration plays once and then gets out of the way.
  useEffect(() => {
    if (!finale) return;
    const id = setTimeout(() => setFinale(false), 6000);
    return () => clearTimeout(id);
  }, [finale]);

  return (
    <div className="mx-auto mt-24 max-w-3xl">
      <h3 className="text-center font-serif text-2xl text-pearl sm:text-3xl">
        {content.birthday.giftsTitle}
      </h3>
      <p className="mt-3 text-center font-sans text-sm text-pearl/60">
        {content.birthday.giftsSubtitle}
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {gifts.map((gift, i) => {
          const isOpen = opened.has(i);
          return (
            <motion.button
              key={gift.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -7, scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              onClick={(e) => openGift(i, e)}
              className={`gift-box relative aspect-square overflow-hidden rounded-2xl ${
                isOpen ? "gift-box--opened" : ""
              }`}
              aria-label={`${i + 1}-sovg'a`}
            >
              {/* Unopened boxes fidget, so the grid never sits still. */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0"
                animate={
                  isOpen
                    ? { rotate: 0, y: 0 }
                    : { rotate: [0, -1.8, 1.8, 0], y: [0, -2.5, 0] }
                }
                transition={{
                  duration: 2.6,
                  repeat: isOpen ? 0 : Infinity,
                  repeatDelay: 1.6 + (i % 4) * 0.5,
                  ease: "easeInOut",
                }}
              >
                <span className="gift-lid" />
              </motion.span>

              <span className="absolute inset-x-0 bottom-3 z-10 font-sans text-[10px] uppercase tracking-[0.25em] text-champagne/80">
                {isOpen ? content.birthday.giftOpened : `${i + 1}`}
              </span>

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    key="ribbon"
                    initial={{ scale: 0, rotate: -40 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
                    className="absolute right-2 top-2 z-10 text-base"
                    aria-hidden="true"
                  >
                    🎀
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Confetti burst, fired from wherever the tapped box sits. */}
      {burst && (
        <div className="pointer-events-none fixed inset-0 z-[90]">
          <Confetti
            key={burst.id}
            mode="burst"
            origin={{ x: burst.x, y: burst.y }}
            count={64}
            onDone={() => setBurst(null)}
          />
        </div>
      )}

      {/* All eight opened — a proper little celebration. */}
      <AnimatePresence>
        {finale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[88]"
          >
            <Confetti mode="rain" />
            <Balloons opacity={0.6} />
            <motion.p
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.45, duration: 1 }}
              className="glass absolute left-1/2 top-24 -translate-x-1/2 rounded-full px-8 py-4 text-center font-script text-2xl text-champagne glow-gold sm:text-3xl"
            >
              {content.birthday.giftAllOpened}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, y: 16, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.45, duration: 0.8 }}
              className="glass relative max-w-sm overflow-hidden rounded-3xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Balloons
                items={CARD_BALLOONS}
                travel="-130%"
                start="-24%"
                opacity={0.45}
              />
              <Confetti mode="rain" />

              <motion.div
                aria-hidden="true"
                className="relative mb-3 text-4xl"
                animate={{ y: [0, -9, 0], rotate: [-7, 7, -7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                🎁
              </motion.div>

              <p className="relative font-script text-3xl text-rosegold glow-soft">
                {gifts[open].title}
              </p>
              <p className="relative mt-5 font-serif text-lg italic leading-relaxed text-pearl/90">
                {gifts[open].text}
              </p>
              <button
                onClick={() => setOpen(null)}
                className="glass relative mt-8 rounded-full px-7 py-2.5 font-sans text-xs uppercase tracking-[0.25em] text-champagne transition-transform hover:scale-105"
              >
                {content.birthday.giftClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Downloadable card ────────────────────────────────────── */

function CardKeepsake() {
  const c = content.birthday.card;
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  // Render it once when the section is reached, so she sees it before saving.
  useEffect(() => {
    let url: string | null = null;
    drawBirthdayCard()
      .then((blob) => {
        url = URL.createObjectURL(blob);
        setPreview(url);
      })
      .catch(() => {});
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  const save = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await drawBirthdayCard();
      downloadBlob(blob, "dilnura-tugilgan-kun.png");
      setSaved(true);
      notify("🖼 <b>Dilnura</b> tabrik kartasini yuklab oldi.");
    } catch {
      /* if the canvas fails, the preview above is still hers to screenshot */
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
      className="mx-auto mt-24 max-w-md text-center"
    >
      <p className="font-script text-3xl text-rosegold glow-soft">{c.script}</p>
      <h3 className="mt-2 font-serif text-2xl text-pearl sm:text-3xl">{c.title}</h3>
      <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-pearl/65">
        {c.subtitle}
      </p>

      <div className="glass mt-8 overflow-hidden rounded-3xl p-3">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt={c.alt}
            className="w-full rounded-2xl"
            width={1080}
            height={1350}
          />
        ) : (
          <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-white/5" />
        )}
      </div>

      <button
        onClick={save}
        disabled={busy}
        className="btn-yes mt-7 rounded-full px-9 py-3.5 font-sans text-xs uppercase tracking-[0.25em] text-night disabled:opacity-50"
      >
        {saved ? c.saved : c.button}
      </button>
    </motion.div>
  );
}
