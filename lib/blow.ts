/**
 * Microphone "blow" detector — powers blowing out the birthday candles.
 *
 * A blow is a burst of broadband LOW-frequency energy with very little
 * high end, which is what separates it from speech, music or room noise.
 * Must be started from a user gesture (the AudioContext needs one).
 */

export type BlowDetector = {
  /** Releases the microphone and stops the analysis loop. */
  stop: () => void;
};

export type BlowOptions = {
  /** Called every frame with the current low-band level, 0..1. */
  onLevel?: (level: number) => void;
  /** Called (at most every `throttleMs`) while she is blowing. */
  onBlow?: () => void;
  /** Level a blow has to clear. Lower = more sensitive. */
  threshold?: number;
  throttleMs?: number;
};

/** Throws if the mic is unavailable or permission is denied. */
export async function startBlowDetector({
  onLevel,
  onBlow,
  threshold = 0.42,
  throttleMs = 230,
}: BlowOptions): Promise<BlowDetector> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      // These clean-up filters fight us — a blow looks like noise to them.
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
    video: false,
  });

  const Ctor: typeof AudioContext =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctor();
  await ctx.resume().catch(() => {});

  const source = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.5;
  source.connect(analyser);

  const bins = new Uint8Array(analyser.frequencyBinCount);
  const binHz = ctx.sampleRate / analyser.fftSize;
  const idx = (hz: number) => Math.min(bins.length - 1, Math.max(1, Math.round(hz / binHz)));
  const lowFrom = idx(60);
  const lowTo = idx(520);
  const highFrom = idx(2200);
  const highTo = idx(6000);

  let raf = 0;
  let lastBlow = 0;
  let stopped = false;

  const avg = (from: number, to: number) => {
    let sum = 0;
    for (let i = from; i <= to; i++) sum += bins[i];
    return sum / (to - from + 1) / 255;
  };

  const frame = () => {
    if (stopped) return;
    analyser.getByteFrequencyData(bins);
    const low = avg(lowFrom, lowTo);
    const high = avg(highFrom, highTo);
    onLevel?.(low);

    const now = performance.now();
    const isBlow = low > threshold && low > high * 1.5;
    if (isBlow && now - lastBlow > throttleMs) {
      lastBlow = now;
      onBlow?.();
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    stop() {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(raf);
      source.disconnect();
      stream.getTracks().forEach((t) => t.stop());
      ctx.close().catch(() => {});
    },
  };
}
