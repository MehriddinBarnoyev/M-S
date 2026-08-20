"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { notify } from "@/lib/telegram";

/** She writes a birthday wish; it lands in your Telegram. */
export default function WishBox() {
  const t = content.birthday.wish;
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const send = () => {
    const wish = text.trim();
    if (!wish || sending || sent) return;
    setSending(true);
    notify(
      `🕯 <b>Dilnura</b>ning tug'ilgan kun tilagi:\n\n<i>${escapeHtml(wish)}</i>`
    );
    // notify() is fire-and-forget, so give it a beat before thanking her.
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="glass mx-auto mt-20 max-w-xl rounded-3xl p-8 text-center sm:p-10"
    >
      <p className="font-script text-3xl text-rosegold glow-soft">{t.script}</p>
      <h3 className="mt-2 font-serif text-2xl text-pearl sm:text-3xl">{t.title}</h3>

      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-8"
        >
          <p className="font-serif text-lg italic text-champagne">{t.thanks}</p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-pearl/70">
            {t.thanksNote}
          </p>
        </motion.div>
      ) : (
        <>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-pearl/70">
            {t.subtitle}
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={700}
            placeholder={t.placeholder}
            className="mt-7 w-full resize-none rounded-2xl border border-white/12 bg-black/35 p-4 font-serif text-base italic text-pearl placeholder:text-pearl/35 outline-none transition-colors focus:border-champagne/50"
          />
          <button
            onClick={send}
            disabled={!text.trim() || sending}
            className="btn-yes mt-5 rounded-full px-9 py-3.5 font-sans text-xs uppercase tracking-[0.25em] text-night disabled:cursor-not-allowed disabled:opacity-40"
          >
            {sending ? t.sending : t.send}
          </button>
        </>
      )}
    </motion.div>
  );
}

/** notify() posts with parse_mode HTML — keep her words from breaking it. */
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
