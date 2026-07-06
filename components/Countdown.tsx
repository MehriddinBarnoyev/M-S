"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/content";

function diffParts(from: Date) {
  const ms = Date.now() - from.getTime();
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [parts, setParts] = useState<ReturnType<typeof diffParts> | null>(null);

  useEffect(() => {
    const from = new Date(content.metDate);
    const update = () => setParts(diffParts(from));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { value: parts?.days, label: "kun" },
    { value: parts?.hours, label: "soat" },
    { value: parts?.minutes, label: "daqiqa" },
    { value: parts?.seconds, label: "soniya" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl"
    >
      <p className="mb-6 text-center font-script text-2xl text-rosegold glow-soft sm:text-3xl">
        va bu kunlarning har birini men yaxshi ko'rdim...
      </p>
      <div className="grid grid-cols-4 gap-3 sm:gap-5">
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
      <p className="mt-6 text-center font-sans text-sm tracking-wide text-pearl/60">
...seni tanigan kunimdan beri
      </p>
    </motion.div>
  );
}
