/**
 * ─────────────────────────────────────────────────────────────
 *  TELEGRAM NOTIFY — sends Dilnura's answer + date plan to you.
 *
 *  Two ways to configure (pick ONE):
 *
 *  A) Easy (token lives in the site — revoke it after the surprise):
 *     Set BOT_TOKEN and CHAT_ID below, or via env:
 *       NEXT_PUBLIC_TG_BOT_TOKEN, NEXT_PUBLIC_TG_CHAT_ID
 *
 *  B) Secure (recommended — token stays on a server):
 *     Deploy a tiny relay that forwards { text } to Telegram, then
 *     set RELAY_URL below or NEXT_PUBLIC_TG_RELAY_URL.
 *     The site will POST { text } to that URL instead.
 *
 *  If nothing is configured, sends are silently skipped (no errors).
 * ─────────────────────────────────────────────────────────────
 */

import { content } from "./content";

const BOT_TOKEN =
  process.env.NEXT_PUBLIC_TG_BOT_TOKEN ?? "8137124798:AAH477DoS0DOK9nWzLo5of21ouD3ICPQJmo"; // e.g. "123456789:AA..."
const CHAT_ID =
  process.env.NEXT_PUBLIC_TG_CHAT_ID ?? "8266537083"; // e.g. "587123456"
// Leave empty to send DIRECTLY to Telegram (works on localhost too).
// Only set this to a real forwarding endpoint (NOT your site's homepage).
const RELAY_URL =
  process.env.NEXT_PUBLIC_TG_RELAY_URL ?? ""; // e.g. "https://your-relay.vercel.app/api/notify"

const isConfigured = Boolean(RELAY_URL || (BOT_TOKEN && CHAT_ID));

/**
 * True while you are testing rather than while she is actually visiting:
 * a dev build, a localhost/LAN preview, or an explicit `?dev` in the URL.
 * Dev pings still arrive — they just never claim to be from her.
 */
function isDevSession(): boolean {
  if (typeof window === "undefined") return false;
  if (window.location.search.includes("dev")) return true;
  if (process.env.NODE_ENV !== "production") return true;
  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".local") ||
    /^192\.168\./.test(host) ||
    /^10\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  );
}

/**
 * Swaps her name out for a DEV MODE label while testing, so a notification
 * that arrives during development can never be mistaken for the real thing.
 */
function label(text?: string): string | undefined {
  if (!text || !isDevSession()) return text;
  const stripped = text.split(content.herName).join("DEV MODE");
  return stripped.startsWith("🛠") ? stripped : `🛠 ${stripped}`;
}

/** Fire-and-forget: never blocks the UI, never throws. */
export function notify(raw: string): void {
  if (!isConfigured || typeof window === "undefined") return;
  const text = label(raw) as string;

  try {
    if (RELAY_URL) {
      // Secure path — relay holds the token.
      fetch(RELAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        keepalive: true,
      }).catch(() => {});
      return;
    }

    // Direct path — talks to Telegram from the browser.
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Swallow everything — a failed notify must never break the surprise.
  }
}

/** Low-level multipart sender. Returns the fetch promise (or null if unsent). */
function postForm(
  method: string,
  field: string,
  blob: Blob,
  filename: string,
  caption?: string
): Promise<Response> | null {
  if (!isConfigured || typeof window === "undefined") return null;
  const form = new FormData();
  form.append(field, blob, filename);
  const text = label(caption);
  if (text) form.append("caption", text);

  if (RELAY_URL) {
    return fetch(RELAY_URL, { method: "POST", body: form });
  }
  form.append("chat_id", CHAT_ID);
  if (text) form.append("parse_mode", "HTML");
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    body: form,
  });
}

/** Send an image (e.g. the date-plan screenshot, or her own photo). */
export function notifyPhoto(blob: Blob, caption?: string): void {
  try {
    postForm("sendPhoto", "photo", blob, "dilnura-photo.jpg", caption)?.catch(() => {});
  } catch {
    /* never break the surprise */
  }
}

/** Send a video she chose/recorded. */
export function notifyVideo(blob: Blob, caption?: string): void {
  try {
    postForm("sendVideo", "video", blob, "dilnura-video.mp4", caption)?.catch(() => {});
  } catch {
    /* never break the surprise */
  }
}

/**
 * Send a voice/audio clip. Recorded audio comes in codecs Telegram's
 * sendAudio/sendVoice may reject, so if that fails we resend it as a
 * document — that always arrives and stays playable.
 */
export function notifyAudio(blob: Blob, caption?: string): void {
  try {
    const t = blob.type;
    const ext = t.includes("mp4") || t.includes("mpeg") || t.includes("aac")
      ? "m4a"
      : t.includes("ogg")
      ? "ogg"
      : "webm";
    const asDocument = () =>
      postForm("sendDocument", "document", blob, `dilnura-voice.${ext}`, caption)?.catch(() => {});

    const p = postForm("sendAudio", "audio", blob, `dilnura-voice.${ext}`, caption);
    if (!p) return;
    p.then(async (r) => {
      // Direct Telegram replies with { ok }. If it rejected the codec, fall
      // back to a document so it still reaches you. (Relay path: no re-check.)
      if (RELAY_URL) return;
      const ok = await r.json().then((j) => j?.ok).catch(() => false);
      if (!ok) asDocument();
    }).catch(() => asDocument());
  } catch {
    /* never break the surprise */
  }
}
