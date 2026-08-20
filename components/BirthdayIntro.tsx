"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { turningAge } from "@/lib/birthday";
import { startBlowDetector, type BlowDetector } from "@/lib/blow";
import { notify } from "@/lib/telegram";
import Celebration from "@/components/Celebration";

type Stage = "line" | "cake" | "done";

/**
 * The birthday opening: one sentence, then a cake she blows out — with the
 * real microphone if she allows it, or by tapping if she doesn't. When the
 * last candle dies, the celebration fires and the rest of the site unlocks.
 */
export default function BirthdayIntro({ onBegin }: { onBegin: () => void }) {
  const t = content.birthday.intro;
  // One candle per year, so the cake actually says how old she is turning.
  const age = turningAge();
  const CANDLES = Math.min(24, Math.max(3, age ?? 8));
  const candlesTitle =
    age === null ? t.candlesTitleFallback : t.candlesTitle.replace("{n}", String(age));

  const [stage, setStage] = useState<Stage>("line");
  const [lit, setLit] = useState(CANDLES);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const [level, setLevel] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // Jump straight to a stage while previewing: ?stage=cake / ?stage=done
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("stage");
    if (preview === "cake" || preview === "done") setStage(preview);
  }, []);

  const detectorRef = useRef<BlowDetector | null>(null);
  const litRef = useRef(CANDLES);
  litRef.current = lit;

  const stopMic = useCallback(() => {
    detectorRef.current?.stop();
    detectorRef.current = null;
    setListening(false);
    setLevel(0);
  }, []);

  useEffect(() => stopMic, [stopMic]);

  const blowOne = useCallback(() => {
    setLit((n) => {
      const next = Math.max(0, n - 1);
      if (next === 0 && n > 0) {
        notify("🎂 <b>Dilnura</b> shamlarni puflab o'chirdi — tilak tiladi!");
        setTimeout(() => {
          detectorRef.current?.stop();
          detectorRef.current = null;
          setListening(false);
          setStage("done");
        }, 700);
      }
      return next;
    });
  }, []);

  const enableMic = useCallback(async () => {
    if (detectorRef.current) return;
    setMicError(false);
    try {
      detectorRef.current = await startBlowDetector({
        onLevel: setLevel,
        onBlow: () => {
          if (litRef.current > 0) blowOne();
        },
      });
      setListening(true);
      notify("🎙 <b>Dilnura</b> mikrofonni yoqdi — shamlarni puflamoqchi.");
    } catch {
      setMicError(true);
      setListening(false);
    }
  }, [blowOne]);

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    stopMic();
    setTimeout(onBegin, 1400);
  };

  // A blow makes every remaining flame lean and stretch.
  const gust = Math.min(1, level * 1.6);

  return (
    <>
      {stage === "done" && (
        <div className="pointer-events-none fixed inset-0 z-[85]">
          <Celebration mode="grand" />
        </div>
      )}

      <AnimatePresence>
        {!leaving ? (
          <motion.div
            key="bday"
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-black px-6 py-14 text-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            {/* ── Opening sentence ─────────────────────────── */}
            {stage === "line" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex w-full flex-col items-center"
              >
                <motion.p
                  initial={{ opacity: 0, filter: "blur(12px)", letterSpacing: "0.35em" }}
                  animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "0.12em" }}
                  transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                  className="glow-soft w-full max-w-2xl font-serif text-xl italic text-pearl/90 sm:text-2xl md:text-3xl"
                >
                  {t.line}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 1.3 }}
                  onClick={() => setStage("cake")}
                  className="glass mt-14 rounded-full px-10 py-4 font-sans text-sm uppercase tracking-[0.28em] text-champagne transition-all duration-300 hover:scale-105 hover:border-champagne/40 hover:shadow-[0_0_40px_rgba(243,217,164,0.25)]"
                >
                  <span className="glow-gold">{t.cta}</span>
                </motion.button>
              </motion.div>
            )}

            {/* ── The cake ─────────────────────────────────── */}
            {stage === "cake" && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full max-w-md flex-col items-center"
              >
                <p className="font-script text-3xl text-rosegold glow-soft sm:text-4xl">
                  {candlesTitle}
                </p>

                <Cake count={CANDLES} lit={lit} gust={gust} />

                <p className="mt-9 max-w-sm font-serif text-base italic leading-relaxed text-pearl/80">
                  {listening ? t.listening : t.blowHint}
                </p>
                <p className="mt-2 font-sans text-xs tracking-widest text-champagne/70">
                  {t.wishHint}
                </p>

                {!listening && (
                  <button
                    onClick={enableMic}
                    className="glass mt-8 max-w-full rounded-full px-6 py-3.5 font-sans text-[11px] uppercase leading-relaxed tracking-[0.18em] text-champagne transition-transform hover:scale-105 sm:px-8 sm:text-xs sm:tracking-[0.25em]"
                  >
                    <span className="glow-gold">{t.micButton}</span>
                  </button>
                )}

                {listening && (
                  <div className="mt-8 h-1.5 w-52 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-rosegold to-champagne"
                      animate={{ width: `${Math.round(gust * 100)}%` }}
                      transition={{ duration: 0.12 }}
                    />
                  </div>
                )}

                {micError && (
                  <p className="mt-5 max-w-xs font-sans text-xs leading-relaxed text-rosegold/80">
                    {t.micDenied}
                  </p>
                )}

                <button
                  onClick={() => lit > 0 && blowOne()}
                  className="mt-6 font-sans text-[11px] uppercase tracking-[0.25em] text-pearl/45 underline-offset-8 transition-colors hover:text-pearl/80 hover:underline"
                >
                  {t.tapButton}
                </button>
              </motion.div>
            )}

            {/* ── Blown out ────────────────────────────────── */}
            {stage === "done" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full flex-col items-center"
              >
                <p className="font-script text-5xl leading-tight text-gradient-gold glow-gold sm:text-7xl">
                  {t.done}
                </p>
                <p className="mt-7 max-w-md font-serif text-base italic leading-relaxed text-pearl/85 sm:text-lg">
                  {t.doneNote}
                </p>
                <button
                  onClick={finish}
                  className="btn-yes mt-12 rounded-full px-11 py-4 font-sans text-sm uppercase tracking-[0.28em] text-night"
                >
                  {t.continue}
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="fade"
            className="pointer-events-none fixed inset-0 z-[80] bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** A two-tier cake with `count` candles, the first `lit` of them burning. */
function Cake({ count, lit, gust }: { count: number; lit: number; gust: number }) {
  const candles = Array.from({ length: count }, (_, i) => i);

  // The cake board is 300px wide; give every candle an equal slot inside it
  // and derive the candle/flame sizes from that, capped at the natural size.
  const slot = Math.min(17, 286 / count);
  const candleW = Math.max(5, Math.round(slot * 0.64 * 10) / 10);
  const gap = Math.max(2, Math.round((slot - candleW) * 10) / 10);
  const scale = candleW / 11; // 11px is the natural candle width
  const flameW = 14 * scale;
  const flameH = 21 * scale;
  const cakeVars = {
    "--candle-w": `${candleW}px`,
    "--candle-h": `${42 * scale}px`,
    "--flame-w": `${flameW}px`,
    "--flame-h": `${flameH}px`,
  } as React.CSSProperties;

  return (
    <div className="relative mt-12 w-full max-w-[300px]">
      {/* warm glow from the flames, fading as they go out */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,178,80,0.35), transparent 62%)",
        }}
        animate={{ opacity: lit / Math.max(1, count) }}
        transition={{ duration: 0.6 }}
      />

      <div
        className="relative flex items-end justify-center pb-1"
        style={{ ...cakeVars, gap: `${gap}px` }}
      >
        {candles.map((i) => (
          <Candle key={i} lit={i < lit} gust={gust} index={i} flameW={flameW} flameH={flameH} />
        ))}
      </div>

      <div className="cake-top relative mx-auto h-[52px] w-[76%]" />
      <div className="cake-bottom relative mx-auto h-[66px] w-full" />
      <div className="cake-plate mx-auto -mb-1 h-3 w-[calc(100%+22px)] max-w-none" />
    </div>
  );
}

function Candle({
  lit,
  gust,
  index,
  flameW,
  flameH,
}: {
  lit: boolean;
  gust: number;
  index: number;
  flameW: number;
  flameH: number;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ height: flameH + 1, width: flameW }}>
      <AnimatePresence>
        {lit ? (
          <motion.div
            key="flame"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: gust * 26 * (index % 2 ? 1 : -1),
              scaleY: 1 + gust * 0.5,
            }}
            exit={{ opacity: 0, scale: 0.2, y: -4 }}
            transition={{ duration: 0.22 }}
            className="flame"
          />
        ) : (
          <motion.div
            key="smoke"
            initial={{ opacity: 0.7, y: 0, scale: 0.6 }}
            animate={{ opacity: 0, y: -34, scale: 1.8 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-white/35 blur-[3px]"
          />
        )}
      </AnimatePresence>
      </div>
      <div className="wick" />
      <div className="candle" />
    </div>
  );
}
