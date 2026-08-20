/**
 * Draws her birthday card straight onto a canvas (no html2canvas), so the
 * result is identical on every phone and can be downloaded as a PNG.
 */

import { content } from "./content";
import { turningAge } from "./birthday";

const W = 1080;
const H = 1350;

/** next/font generates hashed family names — read them off the CSS vars. */
function fontVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.body).getPropertyValue(name).trim();
  return v ? `${v}, ${fallback}` : fallback;
}

/** `letterSpacing` is newer than the DOM typings — set it where supported. */
function setTracking(ctx: CanvasRenderingContext2D, value: string) {
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = value;
}

function centered(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  font: string,
  fill: string | CanvasGradient
) {
  ctx.font = font;
  ctx.fillStyle = fill;
  ctx.textAlign = "center";
  ctx.fillText(text, W / 2, y);
}

export async function drawBirthdayCard(): Promise<Blob> {
  const c = content.birthday.card;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unsupported");

  // Wait for the webfonts, otherwise the first draw falls back to Georgia.
  await (document as unknown as { fonts?: FontFaceSet }).fonts?.ready?.catch(() => {});

  const serif = fontVar("--font-playfair", "Georgia, serif");
  const script = fontVar("--font-script", "Georgia, serif");
  const sans = fontVar("--font-inter", "system-ui, sans-serif");

  // ── night background ──────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0b1026");
  bg.addColorStop(0.55, "#080b1c");
  bg.addColorStop(1, "#050510");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // rose glow behind the name
  const glow = ctx.createRadialGradient(W / 2, H * 0.42, 40, W / 2, H * 0.42, W * 0.7);
  glow.addColorStop(0, "rgba(232,180,184,0.20)");
  glow.addColorStop(1, "rgba(232,180,184,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── stars (deterministic, so every card looks the same) ──
  let seed = 20260819;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let i = 0; i < 140; i++) {
    const x = rnd() * W;
    const y = rnd() * H;
    const r = 0.6 + rnd() * 1.9;
    ctx.globalAlpha = 0.25 + rnd() * 0.6;
    ctx.fillStyle = "#fdf6ee";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // ── gold double frame ─────────────────────────────────
  const gold = ctx.createLinearGradient(0, 0, W, 0);
  gold.addColorStop(0, "#c98a90");
  gold.addColorStop(0.5, "#f3d9a4");
  gold.addColorStop(1, "#d4af6a");
  ctx.strokeStyle = gold;
  ctx.lineWidth = 3;
  ctx.strokeRect(46, 46, W - 92, H - 92);
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 1;
  ctx.strokeRect(62, 62, W - 124, H - 124);
  ctx.globalAlpha = 1;

  // ── content ───────────────────────────────────────────
  setTracking(ctx, "10px");
  centered(ctx, c.dateLine.toUpperCase(), 190, `500 30px ${sans}`, "rgba(243,217,164,0.85)");

  const age = turningAge();
  if (age !== null) {
    setTracking(ctx, "14px");
    centered(
      ctx,
      c.ageLine.replace("{n}", String(age)).toUpperCase(),
      278,
      `300 26px ${sans}`,
      "rgba(253,246,238,0.5)"
    );
  }
  setTracking(ctx, "0px");

  centered(ctx, c.greeting, 400, `italic 500 62px ${serif}`, "rgba(253,246,238,0.92)");
  centered(ctx, content.herName, 600, `400 168px ${script}`, gold);

  // divider
  ctx.strokeStyle = "rgba(243,217,164,0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 150, 690);
  ctx.lineTo(W / 2 + 150, 690);
  ctx.stroke();

  // heart on the divider
  ctx.fillStyle = "#e8b4b8";
  ctx.beginPath();
  const hx = W / 2;
  const hy = 690;
  ctx.moveTo(hx, hy + 10);
  ctx.bezierCurveTo(hx - 20, hy - 8, hx - 8, hy - 22, hx, hy - 10);
  ctx.bezierCurveTo(hx + 8, hy - 22, hx + 20, hy - 8, hx, hy + 10);
  ctx.fill();

  const quoteLines = c.quote.split("\n");
  quoteLines.forEach((line, i) => {
    centered(ctx, line, 810 + i * 66, `italic 400 42px ${serif}`, "rgba(253,246,238,0.82)");
  });

  centered(ctx, "♥", 1080, `400 54px ${serif}`, "rgba(232,180,184,0.9)");

  setTracking(ctx, "6px");
  centered(ctx, c.signoff, 1215, `300 26px ${sans}`, "rgba(253,246,238,0.55)");
  setTracking(ctx, "0px");

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/png"
    );
  });
}

/** Hands the PNG to her browser as a download. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
