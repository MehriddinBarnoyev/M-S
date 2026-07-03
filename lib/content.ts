/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE — everything personal lives here.
 *  Photos go in /public/photos/  (see /public/photos/README.md)
 * ─────────────────────────────────────────────────────────────
 */

export const content = {
  herName: "My Love",

  // The day you met — powers the live countdown. Format: YYYY-MM-DDTHH:mm:ss
  metDate: "2023-02-14T19:30:00",

  intro: {
    line: "Someone has something very special to tell you...",
  },

  hero: {
    kicker: "A story written in the stars",
    title: "For You",
    typed: [
      "This is not just a website...",
      "This is everything I never said out loud...",
      "This is my heart, open for you.",
    ],
  },

  // ── PHOTO STORY ──────────────────────────────────────────────
  // Drop images into /public/photos and list them here.
  // If a file doesn't exist yet, an elegant placeholder is shown.
  photos: [
    { src: "/photos/her-1.jpg", caption: "The smile that changed everything", rotate: -6 },
    { src: "/photos/her-2.jpg", caption: "A queen among the roses", rotate: 4 },
    { src: "/photos/her-3.jpg", caption: "Golden hour, golden you", rotate: -3 },
    { src: "/photos/her-4.jpg", caption: "The look that stops my heart", rotate: 6 },
    { src: "/photos/her-5.jpg", caption: "Brilliant. Beautiful. You.", rotate: -5 },
    { src: "/photos/her-6.jpg", caption: "The night I couldn't look away", rotate: 3 },
  ],

  // ── LOVE STORY TIMELINE ─────────────────────────────────────
  timeline: [
    {
      date: "The Beginning",
      title: "The day I first saw you",
      text: "Time slowed down. The world went quiet. And somehow, I already knew my life had just changed forever.",
    },
    {
      date: "First Words",
      title: "The day we talked",
      text: "One conversation. That's all it took. I walked away smiling and I haven't stopped since.",
    },
    {
      date: "The Realization",
      title: "The day I knew you were different",
      text: "Not different like anyone else. Different like no one else. Different like home.",
    },
    {
      date: "Every Day Since",
      title: "Every beautiful memory",
      text: "The laughs, the late nights, the quiet moments that meant everything. Each one led us here — to tonight.",
    },
  ],

  // ── CINEMATIC MESSAGES (word-by-word reveal) ────────────────
  messages: [
    "Some people search their whole lives for someone special...",
    "I was lucky...",
    "Because somehow...",
    "I found you.",
  ],

  // ── THE LOVE LETTER ─────────────────────────────────────────
  letter: {
    greeting: "To the love of my life,",
    paragraphs: [
      "I have started this letter a hundred times, and every version fell short — because there are no words big enough for what you are to me.",
      "You are my calm in the chaos, my laughter on hard days, my favorite hello and my hardest goodbye. Loving you is the easiest thing I have ever done, and the most extraordinary.",
      "I don't need forever to know. I knew the moment I met you. But I would love nothing more than to spend forever proving it.",
    ],
    signoff: "Forever yours,",
    signature: "Me",
  },

  // ── THE QUESTION ────────────────────────────────────────────
  proposal: {
    lead: "So there is only one thing left to ask...",
    question: "Will You Marry Me?",
    yes: "YES",
    notYet: "I need a little more time",
    yesResponse: "You just made me the happiest person alive",
    notYetResponse: "I'll wait... Because you're worth every second.",
  },

  // Optional: put an mp3 at /public/audio/voice-message.mp3
  // and the voice-message player will appear automatically.
  voiceMessage: {
    src: "/audio/voice-message.mp3",
    label: "I recorded something for you...",
  },

  // Hidden easter-egg hearts — little secrets she can find.
  secrets: [
    "You found a secret! Here it is: I smile every time your name lights up my phone.",
    "Another secret: I kept the ticket from our first date.",
    "Last secret: I practiced this moment in the mirror. Twice. Okay... many times.",
  ],
};

export type PhotoItem = (typeof content.photos)[number];
export type TimelineItem = (typeof content.timeline)[number];
