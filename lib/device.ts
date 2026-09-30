/**
 * ─────────────────────────────────────────────────────────────
 * Device & Environment Telemetry Service
 *
 * Extracts comprehensive hardware, OS, browser, screen, GPU,
 * battery, network, and locale specifications from client environment.
 * ─────────────────────────────────────────────────────────────
 */

export interface DeviceSpecs {
  deviceType: "Mobile" | "Tablet" | "Desktop";
  brand: string;
  model: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  isInAppBrowser: boolean;
  inAppName?: string;
  screenResolution: string;
  viewportSize: string;
  devicePixelRatio: number;
  orientation: "portrait" | "landscape";
  colorDepth: number;
  touchPoints: number;
  cpuCores?: number;
  deviceMemory?: string;
  gpuRenderer?: string;
  gpuVendor?: string;
  batteryStatus?: string;
  networkConnection?: string;
  language: string;
  timezone: string;
  localTime: string;
  isDarkMode: boolean;
  referrer: string;
  currentUrl: string;
}

/**
 * Maps Apple screen resolution and pixel ratio to likely iPhone / iPad commercial models.
 */
function resolveAppleDevice(width: number, height: number, dpr: number, isIpad: boolean): string {
  const w = Math.min(width, height);
  const h = Math.max(width, height);

  if (isIpad) {
    if (w === 1024 && h === 1366) return "iPad Pro 12.9\"";
    if (w === 834 && h === 1194) return "iPad Pro 11\"";
    if (w === 834 && h === 1112) return "iPad Air (3rd gen) / iPad Pro 10.5\"";
    if (w === 820 && h === 1180) return "iPad (10th gen) / iPad Air (4/5th gen)";
    if (w === 810 && h === 1080) return "iPad (7th/8th/9th gen)";
    if (w === 768 && h === 1024) return "iPad mini / iPad 9.7\"";
    return "Apple iPad";
  }

  // iPhones mapped by viewport points & DPR
  if (dpr >= 3) {
    if (w === 440 && h === 956) return "iPhone 16 Pro Max";
    if (w === 402 && h === 874) return "iPhone 16 Pro";
    if (w === 430 && h === 932) return "iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus";
    if (w === 393 && h === 852) return "iPhone 14 Pro / 15 / 15 Pro / 16";
    if (w === 428 && h === 926) return "iPhone 12 Pro Max / 13 Pro Max / 14 Plus";
    if (w === 390 && h === 844) return "iPhone 12 / 12 Pro / 13 / 13 Pro / 14";
    if (w === 375 && h === 812) return "iPhone X / XS / 11 Pro";
    if (w === 360 && h === 780) return "iPhone 12 mini / 13 mini";
    if (w === 414 && h === 896) return "iPhone XS Max / 11 Pro Max";
    if (w === 414 && h === 736) return "iPhone 6+/6s+/7+/8+";
  } else if (dpr >= 2) {
    if (w === 414 && h === 896) return "iPhone 11 / XR";
    if (w === 375 && h === 667) return "iPhone SE (2nd/3rd gen) / 8 / 7 / 6s";
    if (w === 320 && h === 568) return "iPhone SE (1st gen) / 5s";
  }

  return "Apple iPhone";
}

/**
 * Human-friendly lookup for popular Samsung model codes.
 */
function resolveSamsungModel(modelCode: string): string {
  const code = modelCode.toUpperCase().trim();
  const map: Record<string, string> = {
    // S24 series
    "SM-S928": "Samsung Galaxy S24 Ultra",
    "SM-S926": "Samsung Galaxy S24+",
    "SM-S921": "Samsung Galaxy S24",
    // S23 series
    "SM-S918": "Samsung Galaxy S23 Ultra",
    "SM-S916": "Samsung Galaxy S23+",
    "SM-S911": "Samsung Galaxy S23",
    // S22 series
    "SM-S908": "Samsung Galaxy S22 Ultra",
    "SM-S906": "Samsung Galaxy S22+",
    "SM-S901": "Samsung Galaxy S22",
    // S21 series
    "SM-G998": "Samsung Galaxy S21 Ultra",
    "SM-G996": "Samsung Galaxy S21+",
    "SM-G991": "Samsung Galaxy S21",
    "SM-G990": "Samsung Galaxy S21 FE",
    // Z Fold / Flip
    "SM-F956": "Samsung Galaxy Z Fold 6",
    "SM-F741": "Samsung Galaxy Z Flip 6",
    "SM-F946": "Samsung Galaxy Z Fold 5",
    "SM-F731": "Samsung Galaxy Z Flip 5",
    "SM-F936": "Samsung Galaxy Z Fold 4",
    "SM-F721": "Samsung Galaxy Z Flip 4",
    // Popular A series
    "SM-A556": "Samsung Galaxy A55 5G",
    "SM-A356": "Samsung Galaxy A35 5G",
    "SM-A546": "Samsung Galaxy A54 5G",
    "SM-A346": "Samsung Galaxy A34 5G",
    "SM-A245": "Samsung Galaxy A24",
    "SM-A155": "Samsung Galaxy A15",
    "SM-A156": "Samsung Galaxy A15 5G",
    "SM-A055": "Samsung Galaxy A05",
    "SM-A536": "Samsung Galaxy A53 5G",
    "SM-A528": "Samsung Galaxy A52s 5G",
    "SM-A525": "Samsung Galaxy A52",
    "SM-A325": "Samsung Galaxy A32",
    "SM-A127": "Samsung Galaxy A12",
  };

  for (const [prefix, name] of Object.entries(map)) {
    if (code.startsWith(prefix)) {
      return `${name} (${modelCode})`;
    }
  }

  return `Samsung Galaxy (${modelCode})`;
}

/**
 * Extracts OS and its exact version from User Agent string.
 */
function parseOS(ua: string): { name: string; version: string } {
  let name = "Noma'lum OS";
  let version = "";

  if (/iPhone|iPad|iPod/.test(ua)) {
    name = "iOS";
    const match = ua.match(/OS (\d+[._]\d+(?:[._]\d+)?)/);
    if (match) version = match[1].replace(/_/g, ".");
  } else if (/Android/.test(ua)) {
    name = "Android";
    const match = ua.match(/Android\s+([0-9.]+)/);
    if (match) version = match[1];
  } else if (/Macintosh|Mac OS X/.test(ua)) {
    name = "macOS";
    const match = ua.match(/Mac OS X (\d+[._]\d+(?:[._]\d+)?)/);
    if (match) version = match[1].replace(/_/g, ".");
  } else if (/Windows NT/.test(ua)) {
    name = "Windows";
    const match = ua.match(/Windows NT (\d+\.\d+)/);
    if (match) {
      const v = match[1];
      if (v === "10.0") version = "10 / 11";
      else if (v === "6.3") version = "8.1";
      else if (v === "6.2") version = "8";
      else if (v === "6.1") version = "7";
      else version = v;
    }
  } else if (/Linux/.test(ua)) {
    name = "Linux";
  } else if (/CrOS/.test(ua)) {
    name = "ChromeOS";
  }

  return { name, version };
}

/**
 * Parses browser name, version, and whether it is run inside an In-App WebView.
 */
function parseBrowser(ua: string): {
  browser: string;
  version: string;
  isInApp: boolean;
  inAppName?: string;
} {
  let isInApp = false;
  let inAppName: string | undefined;

  // In-App browser checks
  if (/Telegram/i.test(ua)) {
    isInApp = true;
    inAppName = "Telegram";
  } else if (/Instagram/i.test(ua)) {
    isInApp = true;
    inAppName = "Instagram";
  } else if (/musical_ly|ByteLocale|TikTok/i.test(ua)) {
    isInApp = true;
    inAppName = "TikTok";
  } else if (/WhatsApp/i.test(ua)) {
    isInApp = true;
    inAppName = "WhatsApp";
  } else if (/FBAN|FBAV/i.test(ua)) {
    isInApp = true;
    inAppName = "Facebook";
  }

  let browser = "Noma'lum brauzer";
  let version = "";

  if (/SamsungBrowser\/([0-9.]+)/i.test(ua)) {
    browser = "Samsung Internet";
    version = ua.match(/SamsungBrowser\/([0-9.]+)/i)?.[1] ?? "";
  } else if (/Edg(?:e|A|iOS)?\/([0-9.]+)/i.test(ua)) {
    browser = "Microsoft Edge";
    version = ua.match(/Edg(?:e|A|iOS)?\/([0-9.]+)/i)?.[1] ?? "";
  } else if (/OPR\/([0-9.]+)|Opera\/([0-9.]+)/i.test(ua)) {
    browser = "Opera";
    version = ua.match(/OPR\/([0-9.]+)|Opera\/([0-9.]+)/i)?.[1] ?? "";
  } else if (/Chrome\/([0-9.]+)/i.test(ua) && !/CriOS/i.test(ua)) {
    browser = "Google Chrome";
    version = ua.match(/Chrome\/([0-9.]+)/i)?.[1] ?? "";
  } else if (/CriOS\/([0-9.]+)/i.test(ua)) {
    browser = "Chrome iOS";
    version = ua.match(/CriOS\/([0-9.]+)/i)?.[1] ?? "";
  } else if (/FxiOS\/([0-9.]+)/i.test(ua)) {
    browser = "Firefox iOS";
    version = ua.match(/FxiOS\/([0-9.]+)/i)?.[1] ?? "";
  } else if (/Firefox\/([0-9.]+)/i.test(ua)) {
    browser = "Mozilla Firefox";
    version = ua.match(/Firefox\/([0-9.]+)/i)?.[1] ?? "";
  } else if (/Version\/([0-9.]+).*Safari/i.test(ua)) {
    browser = "Apple Safari";
    version = ua.match(/Version\/([0-9.]+)/i)?.[1] ?? "";
  }

  return { browser, version, isInApp, inAppName };
}

/**
 * Identifies device brand, commercial model, and category.
 */
function parseDeviceDetails(
  ua: string,
  highEntropyModel?: string
): { deviceType: "Mobile" | "Tablet" | "Desktop"; brand: string; model: string } {
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook)/i.test(
    ua
  );
  const isMobile = !isTablet && /(iphone|ipod|android|mobile|blackberry|iemobile|opera mini)/i.test(ua);
  const deviceType: "Mobile" | "Tablet" | "Desktop" = isTablet
    ? "Tablet"
    : isMobile
    ? "Mobile"
    : "Desktop";

  // If Client Hints provided an exact model (e.g. from Chrome on Android)
  if (highEntropyModel && highEntropyModel.trim().length > 0) {
    const raw = highEntropyModel.trim();
    if (/^SM-[A-Z0-9]+/i.test(raw)) {
      return { deviceType, brand: "Samsung", model: resolveSamsungModel(raw) };
    }
    if (/Pixel/i.test(raw)) {
      return { deviceType, brand: "Google", model: raw };
    }
    if (/Redmi|POCO|Xiaomi|2[0-9]{6}|M2[0-9]{3}/i.test(raw)) {
      return { deviceType, brand: "Xiaomi", model: `Xiaomi / Redmi (${raw})` };
    }
    return { deviceType, brand: "Android", model: raw };
  }

  // Apple iOS device detection
  if (/iPhone|iPad|iPod/.test(ua) || (deviceType === "Desktop" && /Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
    const isIpad = /iPad/.test(ua) || (navigator.maxTouchPoints > 1 && !/iPhone/.test(ua));
    const width = typeof window !== "undefined" ? window.screen.width : 390;
    const height = typeof window !== "undefined" ? window.screen.height : 844;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2;
    const model = resolveAppleDevice(width, height, dpr, isIpad);
    return {
      deviceType: isIpad ? "Tablet" : "Mobile",
      brand: "Apple",
      model,
    };
  }

  // Android device detection from User-Agent
  if (/Android/.test(ua)) {
    // Regex for Android model after "Android ...; <model> Build/..."
    const match = ua.match(/Android[^;]+;(?:\s*wv;)?\s*([^;)]+)\s*(?:Build|[;)])/i);
    const candidate = match ? match[1].trim() : "";

    if (candidate) {
      if (/SM-[A-Z0-9]+/i.test(candidate) || /SAMSUNG/i.test(candidate)) {
        return { deviceType, brand: "Samsung", model: resolveSamsungModel(candidate) };
      }
      if (/Redmi/i.test(candidate)) {
        return { deviceType, brand: "Xiaomi (Redmi)", model: candidate };
      }
      if (/POCO/i.test(candidate)) {
        return { deviceType, brand: "Xiaomi (POCO)", model: candidate };
      }
      if (/Mi\s|Xiaomi/i.test(candidate)) {
        return { deviceType, brand: "Xiaomi", model: candidate };
      }
      if (/Pixel/i.test(candidate)) {
        return { deviceType, brand: "Google", model: candidate };
      }
      if (/HUAWEI|HONOR/i.test(candidate)) {
        return { deviceType, brand: "Huawei / Honor", model: candidate };
      }
      if (/OnePlus/i.test(candidate)) {
        return { deviceType, brand: "OnePlus", model: candidate };
      }
      if (/RMX[0-9]+/i.test(candidate) || /realme/i.test(candidate)) {
        return { deviceType, brand: "Realme", model: candidate };
      }
      if (/CPH[0-9]+/i.test(candidate) || /OPPO/i.test(candidate)) {
        return { deviceType, brand: "OPPO", model: candidate };
      }
      if (/V[0-9]{4}/i.test(candidate) || /vivo/i.test(candidate)) {
        return { deviceType, brand: "Vivo", model: candidate };
      }
      return { deviceType, brand: "Android", model: candidate };
    }

    return { deviceType, brand: "Android", model: "Android qurilmasi" };
  }

  // Desktop checks
  if (/Macintosh|Mac OS X/.test(ua)) {
    return { deviceType: "Desktop", brand: "Apple", model: "Mac / MacBook" };
  }
  if (/Windows/.test(ua)) {
    return { deviceType: "Desktop", brand: "Microsoft", model: "Windows PC / Noutbuk" };
  }
  if (/Linux/.test(ua)) {
    return { deviceType: "Desktop", brand: "Linux", model: "Linux Kompyuter" };
  }

  return { deviceType, brand: "Noma'lum", model: "Noma'lum model" };
}

/**
 * Extracts GPU vendor and renderer using WebGL debug extension.
 */
function getGpuInfo(): { vendor?: string; renderer?: string } {
  if (typeof window === "undefined") return {};
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return {};

    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return {};

    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);

    return {
      renderer: typeof renderer === "string" ? renderer.trim() : undefined,
      vendor: typeof vendor === "string" ? vendor.trim() : undefined,
    };
  } catch {
    return {};
  }
}

/**
 * Safely extracts battery status without throwing.
 */
async function getBatteryStatus(): Promise<string | undefined> {
  if (typeof window === "undefined") return undefined;
  try {
    const nav = navigator as unknown as {
      getBattery?: () => Promise<{
        level: number;
        charging: boolean;
      }>;
    };
    if (typeof nav.getBattery !== "function") return undefined;

    // Timeout in 400ms so battery never slows down telemetry
    const battery = await Promise.race([
      nav.getBattery(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 400)),
    ]);

    if (!battery) return undefined;
    const percent = Math.round(battery.level * 100);
    const state = battery.charging ? "⚡ Quvvatlanmoqda" : "🔋 Batareyada";
    return `${percent}% (${state})`;
  } catch {
    return undefined;
  }
}

/**
 * Extracts network connection details (effectiveType, downlink speed, ping).
 */
function getNetworkConnection(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const nav = navigator as unknown as {
      connection?: {
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
      };
    };
    const conn = nav.connection;
    if (!conn) return undefined;

    const parts: string[] = [];
    if (conn.effectiveType) parts.push(conn.effectiveType.toUpperCase());
    if (conn.downlink) parts.push(`~${conn.downlink} Mbps`);
    if (conn.rtt) parts.push(`ping: ${conn.rtt}ms`);
    if (conn.saveData) parts.push("Data-Saver: Yoqilgan");

    return parts.length ? parts.join(", ") : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Primary exporter: gathers all available device specifications.
 */
export async function getDeviceSpecs(): Promise<DeviceSpecs> {
  if (typeof window === "undefined") {
    return {
      deviceType: "Desktop",
      brand: "Server",
      model: "Next.js Server",
      os: "Node.js",
      osVersion: "",
      browser: "Server",
      browserVersion: "",
      isInAppBrowser: false,
      screenResolution: "0x0",
      viewportSize: "0x0",
      devicePixelRatio: 1,
      orientation: "portrait",
      colorDepth: 24,
      touchPoints: 0,
      language: "uz",
      timezone: "Asia/Tashkent",
      localTime: new Date().toISOString(),
      isDarkMode: false,
      referrer: "",
      currentUrl: "",
    };
  }

  const ua = navigator.userAgent || "";

  // Check modern User-Agent Client Hints if available
  let highEntropyModel: string | undefined;
  try {
    const navUa = (navigator as unknown as {
      userAgentData?: {
        getHighEntropyValues: (hints: string[]) => Promise<{ model?: string }>;
      };
    }).userAgentData;

    if (navUa && typeof navUa.getHighEntropyValues === "function") {
      const data = await Promise.race([
        navUa.getHighEntropyValues(["model"]),
        new Promise<{ model?: string }>((resolve) => setTimeout(() => resolve({}), 250)),
      ]);
      if (data?.model) highEntropyModel = data.model;
    }
  } catch {
    // Client hints not supported or failed
  }

  const { name: osName, version: osVersion } = parseOS(ua);
  const { browser, version: browserVersion, isInApp, inAppName } = parseBrowser(ua);
  const { deviceType, brand, model } = parseDeviceDetails(ua, highEntropyModel);
  const { renderer: gpuRenderer, vendor: gpuVendor } = getGpuInfo();
  const batteryStatus = await getBatteryStatus();
  const networkConnection = getNetworkConnection();

  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const dpr = window.devicePixelRatio || 1;
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const isPortrait =
    (window.screen.orientation && window.screen.orientation.type.startsWith("portrait")) ??
    viewportH >= viewportW;

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Tashkent";
  const localTime = new Date().toLocaleString("uz-UZ", { timeZone: timezone });
  const isDarkMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

  const navAny = navigator as unknown as {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  return {
    deviceType,
    brand,
    model,
    os: osVersion ? `${osName} ${osVersion}` : osName,
    osVersion,
    browser,
    browserVersion,
    isInAppBrowser: isInApp,
    inAppName,
    screenResolution: `${screenW} × ${screenH}`,
    viewportSize: `${viewportW} × ${viewportH}`,
    devicePixelRatio: Number(dpr.toFixed(2)),
    orientation: isPortrait ? "portrait" : "landscape",
    colorDepth: window.screen.colorDepth || 24,
    touchPoints: navigator.maxTouchPoints || 0,
    cpuCores: navAny.hardwareConcurrency,
    deviceMemory: navAny.deviceMemory ? `${navAny.deviceMemory} GB` : undefined,
    gpuRenderer,
    gpuVendor,
    batteryStatus,
    networkConnection,
    language: navigator.language || (navigator.languages && navigator.languages[0]) || "uz-UZ",
    timezone,
    localTime,
    isDarkMode,
    referrer: document.referrer || "To'g'ridan-to'g'ri (Direct link)",
    currentUrl: window.location.href,
  };
}
