"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { notify, notifyPhoto, notifyVideo, notifyAudio } from "@/lib/telegram";

type MediaKind = "photo" | "video" | "audio";
type Attachment = { kind: MediaKind; blob: Blob; url: string };

const MAX_MB = 45; // Telegram bot upload limit is ~50MB; stay safely under

/**
 * A gentle, consensual note box. Dilnura can write a few words, and/or
 * attach a photo, a video, or record a voice message — she picks or records
 * it herself, sees a preview, and taps send. Nothing leaves without her tap.
 */
export default function HerMessage() {
  const t = content.birthday.reply;
  const [text, setText] = useState("");
  const [media, setMedia] = useState<Attachment | null>(null);
  const [sent, setSent] = useState(false);
  const [recording, setRecording] = useState(false);
  const [tooBig, setTooBig] = useState(false);

  const photoInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const audioInput = useRef<HTMLInputElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mediaRef = useRef<Attachment | null>(null);
  mediaRef.current = media;

  // Clean up object URLs.
  useEffect(() => {
    return () => {
      if (mediaRef.current) URL.revokeObjectURL(mediaRef.current.url);
    };
  }, []);

  const setAttachment = (kind: MediaKind, blob: Blob) => {
    setTooBig(false);
    if (blob.size > MAX_MB * 1024 * 1024) {
      setTooBig(true);
      return;
    }
    setMedia((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return { kind, blob, url: URL.createObjectURL(blob) };
    });
  };

  const clearAttachment = () => {
    setMedia((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setTooBig(false);
  };

  const onFile = (kind: MediaKind) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachment(kind, file);
    e.target.value = ""; // allow re-picking the same file
  };

  // ── Voice recording ──────────────────────────────────────
  const startRec = async () => {
    if (recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        setAttachment("audio", blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      recorderRef.current = mr;
      setRecording(true);
    } catch {
      // Mic blocked or unsupported — fall back to picking an audio file.
      audioInput.current?.click();
    }
  };
  const stopRec = () => {
    recorderRef.current?.stop();
    recorderRef.current = null;
    setRecording(false);
  };

  // ── Send ─────────────────────────────────────────────────
  const send = () => {
    const msg = text.trim();
    if (sent || (!msg && !media)) return;

    if (media) {
      const caption = msg
        ? `✍️ <b>Dilnura</b>: “${msg}”`
        : "💌 <b>Dilnura</b> sizga yubordi";
      if (media.kind === "photo") notifyPhoto(media.blob, caption);
      else if (media.kind === "video") notifyVideo(media.blob, caption);
      else notifyAudio(media.blob, caption);
    } else {
      notify(`✍️ <b>Dilnura</b> menga bir og'iz yozdi:\n\n“${msg}”`);
    }
    setSent(true);
  };

  const canSend = Boolean(text.trim() || media);

  return (
    <div className="mx-auto mt-16 max-w-md">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-rosegold/50" />
        <span className="text-rosegold" aria-hidden="true">✍</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-rosegold/50" />
      </div>

      <h3 className="font-script text-3xl text-rosegold glow-soft sm:text-4xl">
        {t.title}
      </h3>
      <p className="mx-auto mt-3 max-w-sm font-serif text-base italic text-pearl/70">
        {t.subtitle}
      </p>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-7"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder={t.placeholder}
              className="glass w-full resize-none rounded-3xl px-6 py-4 text-center font-serif text-lg text-pearl placeholder:text-pearl/35 focus:outline-none focus:ring-1 focus:ring-rosegold/50"
            />

            {/* Attachment options */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <AttachBtn label={t.photo} emoji="📷" onClick={() => photoInput.current?.click()} />
              <AttachBtn label={t.video} emoji="🎥" onClick={() => videoInput.current?.click()} />
              {recording ? (
                <button
                  onClick={stopRec}
                  className="flex items-center gap-2 rounded-full bg-rosegold px-5 py-2.5 font-serif text-sm font-semibold text-night"
                >
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-600" />
                  {t.stop}
                </button>
              ) : (
                <AttachBtn label={t.audio} emoji="🎙" onClick={startRec} />
              )}
            </div>

            {recording && (
              <p className="mt-3 font-serif text-sm italic text-rosegold">
                {t.recording}
              </p>
            )}
            {tooBig && (
              <p className="mt-3 font-serif text-sm italic text-red-300/90">
                {t.tooBig.replace("{n}", String(MAX_MB))}
              </p>
            )}

            {/* Preview */}
            <AnimatePresence>
              {media && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="glass relative mx-auto mt-5 max-w-xs overflow-hidden rounded-3xl p-3"
                >
                  <button
                    onClick={clearAttachment}
                    aria-label={t.remove}
                    className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-night/70 text-pearl transition-colors hover:text-rosegold"
                  >
                    ✕
                  </button>
                  {media.kind === "photo" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={media.url} alt="preview" className="max-h-64 w-full rounded-2xl object-cover" />
                  )}
                  {media.kind === "video" && (
                    <video src={media.url} controls className="max-h-64 w-full rounded-2xl" />
                  )}
                  {media.kind === "audio" && (
                    <div className="px-2 py-4">
                      <p className="mb-2 font-serif text-sm text-rosegold">{t.audioReady}</p>
                      <audio src={media.url} controls className="w-full" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden file inputs (capture allows using the phone camera/mic) */}
            <input ref={photoInput} type="file" accept="image/*" onChange={onFile("photo")} className="hidden" />
            <input ref={videoInput} type="file" accept="video/*" onChange={onFile("video")} className="hidden" />
            <input ref={audioInput} type="file" accept="audio/*" onChange={onFile("audio")} className="hidden" />

            <motion.button
              whileHover={{ scale: canSend ? 1.05 : 1 }}
              whileTap={{ scale: canSend ? 0.97 : 1 }}
              onClick={send}
              disabled={!canSend}
              className="btn-yes mt-6 rounded-full px-10 py-3 font-serif text-lg font-semibold text-night disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.send}
              <span className="ml-2" aria-hidden="true">♥</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <div className="mb-3 text-4xl" aria-hidden="true">💌</div>
            <p className="font-script text-3xl text-rosegold glow-soft sm:text-4xl">
              {t.sentTitle}
            </p>
            <p className="mt-3 font-serif text-base italic text-pearl/70">
              {t.sentNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AttachBtn({ label, emoji, onClick }: { label: string; emoji: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="glass flex items-center gap-2 rounded-full px-5 py-2.5 font-serif text-sm text-pearl/90 transition-colors hover:text-pearl"
    >
      <span aria-hidden="true">{emoji}</span>
      {label}
    </motion.button>
  );
}
