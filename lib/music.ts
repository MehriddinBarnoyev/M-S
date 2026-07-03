/**
 * Ambient romantic piano, generated live with the Web Audio API.
 * If /public/audio/music.mp3 exists it is used instead, automatically.
 */

type Mode = "normal" | "celebration";

const NOTE = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

// Gentle progressions expressed as MIDI chord voicings (root position-ish, open)
const PROGRESSIONS: Record<Mode, number[][]> = {
  // Cmaj7 – Am9 – Fmaj9 – Gsus/G  (dreamy, slow)
  normal: [
    [48, 55, 59, 64, 67],
    [45, 52, 57, 60, 64],
    [41, 48, 55, 60, 64],
    [43, 50, 55, 59, 62],
  ],
  // Brighter, lifted a fourth with faster sparkle
  celebration: [
    [53, 60, 64, 67, 72],
    [50, 57, 60, 65, 69],
    [46, 53, 60, 65, 69],
    [48, 55, 62, 65, 71],
  ],
};

class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private wet: GainNode | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private bar = 0;
  private mode: Mode = "normal";
  private fileAudio: HTMLAudioElement | null = null;
  private usingFile = false;

  started = false;
  muted = false;

  async start() {
    if (this.started || typeof window === "undefined") return;
    this.started = true;

    // Prefer a real track if the user dropped one in.
    try {
      const head = await fetch("/audio/music.mp3", { method: "HEAD" });
      const type = head.headers.get("content-type") ?? "";
      if (head.ok && type.startsWith("audio")) {
        this.fileAudio = new Audio("/audio/music.mp3");
        this.fileAudio.loop = true;
        this.fileAudio.volume = 0;
        await this.fileAudio.play();
        this.usingFile = true;
        this.fadeFile(0.6, 3000);
        return;
      }
    } catch {
      /* fall through to generated music */
    }

    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new Ctx();
    if (this.ctx.state === "suspended") {
      const resume = () => this.ctx?.resume();
      document.addEventListener("pointerdown", resume, { once: true });
    }
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);

    // A soft echo space so the piano feels like it's in a large hall
    const delay = this.ctx.createDelay(2);
    delay.delayTime.value = 0.42;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.38;
    const damp = this.ctx.createBiquadFilter();
    damp.type = "lowpass";
    damp.frequency.value = 1600;
    this.wet = this.ctx.createGain();
    this.wet.gain.value = 0.5;
    delay.connect(damp).connect(feedback).connect(delay);
    delay.connect(this.wet).connect(this.master);
    (this as any).delaySend = delay;

    this.master.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 4);
    this.scheduleBar();
  }

  private note(
    midi: number,
    time: number,
    dur: number,
    vol: number,
    bright = false
  ) {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const freq = NOTE(midi);
    osc.type = "sine";
    osc.frequency.value = freq;
    osc2.type = "triangle";
    osc2.frequency.value = freq * 2;
    const g2 = this.ctx.createGain();
    g2.gain.value = bright ? 0.35 : 0.16;

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    osc.connect(gain);
    osc2.connect(g2).connect(gain);
    gain.connect(this.master);
    gain.connect((this as any).delaySend);
    osc.start(time);
    osc2.start(time);
    osc.stop(time + dur + 0.1);
    osc2.stop(time + dur + 0.1);
  }

  private pad(midis: number[], time: number, dur: number) {
    if (!this.ctx || !this.master) return;
    for (const m of midis) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = NOTE(m);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.028, time + dur * 0.4);
      gain.gain.linearRampToValueAtTime(0.0001, time + dur);
      osc.connect(gain).connect(this.master);
      osc.start(time);
      osc.stop(time + dur + 0.1);
    }
  }

  private scheduleBar() {
    if (!this.ctx) return;
    const barLen = this.mode === "celebration" ? 3.2 : 4.4;
    const t0 = this.ctx.currentTime + 0.08;
    const chords = PROGRESSIONS[this.mode];
    const chord = chords[this.bar % chords.length];

    // Warm sustained pad underneath
    this.pad(chord.slice(0, 3), t0, barLen * 1.1);

    // Broken-chord piano figure
    const steps = this.mode === "celebration" ? 8 : 6;
    for (let i = 0; i < steps; i++) {
      const m = chord[i % chord.length] + (i >= chord.length ? 12 : 0);
      const jitter = 0.012 * (i % 3);
      this.note(m + 12, t0 + (barLen / steps) * i + jitter, 2.2, 0.055);
    }

    // Occasional high sparkle note
    if (this.bar % 2 === 1) {
      const top = chord[chord.length - 1] + 24;
      this.note(top, t0 + barLen * 0.5, 3, 0.03, true);
    }

    this.bar++;
    this.timer = setTimeout(() => this.scheduleBar(), barLen * 1000);
  }

  private fadeFile(target: number, ms: number) {
    if (!this.fileAudio) return;
    const from = this.fileAudio.volume;
    const start = performance.now();
    const tick = (now: number) => {
      if (!this.fileAudio) return;
      const p = Math.min(1, (now - start) / ms);
      this.fileAudio.volume = from + (target - from) * p;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  setMode(mode: Mode) {
    this.mode = mode;
    if (mode === "celebration" && this.ctx && this.master && !this.muted) {
      this.master.gain.linearRampToValueAtTime(0.62, this.ctx.currentTime + 2);
    }
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.usingFile) {
      this.fadeFile(this.muted ? 0 : 0.6, 600);
    } else if (this.ctx && this.master) {
      this.master.gain.linearRampToValueAtTime(
        this.muted ? 0 : 0.5,
        this.ctx.currentTime + 0.6
      );
    }
    return this.muted;
  }
}

export const music = new MusicEngine();
