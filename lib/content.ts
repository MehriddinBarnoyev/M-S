/**
 * ═══════════════════════════════════════════════════════════════
 *  BITTA SOZLAMALAR FAYLI — BUTUN SAYT SHU YERDAN BOSHQARILADI
 *
 *  Faqat shu faylni tahrirlang:
 *   1. HER_NAME    — qizning ismi (hamma joyda avtomatik almashadi)
 *   2. MET_DATE    — tanishgan sana (countdown shu sanadan sanaydi)
 *   3. photos      — 6 ta rasm: fayllarni /public/photos/ ga tashlang
 *   4. timeline    — sevgi hikoyangiz (story)
 *   5. site        — sayt manzili va link-preview matnlari
 *   6. telegram    — bildirishnomalar uchun bot sozlamalari (ixtiyoriy)
 *
 *  Rasm fayli hali qo'yilmagan bo'lsa, sayt chiroyli placeholder
 *  ko'rsatadi — hech narsa buzilmaydi.
 * ═══════════════════════════════════════════════════════════════
 */

// ── 1. ISM — bitta joyda o'zgartiring, butun sayt yangilanadi ──
const HER_NAME = "Her Name";

// ── 2. TANISHGAN SANA — format: YYYY-MM-DDTHH:mm:ss ────────────
const MET_DATE = "2020-01-01T10:00:00";

export const content = {
  herName: HER_NAME,
  metDate: MET_DATE,

  // ── SAYT MA'LUMOTLARI (link preview / deploy manzili) ────────
  site: {
    url: "https://example.com", // deploy qilgan manzilingizni yozing
    title: "A little surprise, made just for you",
    description: "Someone made something special. Open me ♥",
  },

  // ── TELEGRAM BILDIRISHNOMALAR ────────────────────────────────
  // Bo'sh qoldirsangiz — hech narsa yuborilmaydi, sayt baribir ishlaydi.
  // Env orqali ham berish mumkin (env ustun turadi):
  //   NEXT_PUBLIC_TG_BOT_TOKEN, NEXT_PUBLIC_TG_CHAT_ID, NEXT_PUBLIC_TG_RELAY_URL
  telegram: {
    botToken: "8137124798:AAH477DoS0DOK9nWzLo5of21ouD3ICPQJmo",
    chatId: "8266537083",
    relayUrl: "", // token serverda tursin desangiz — relay endpoint
  },

  intro: {
    line: `${HER_NAME}... someone has been holding this in for a long time.`,
  },

  hero: {
    kicker: "A long time in the making",
    title: `For ${HER_NAME}`,
    typed: [
      "It started with one ordinary day...",
      "One look, and I never really looked away...",
      "And now, I'm finally saying it.",
    ],
  },

  // ── 3. RASMLAR (6 ta) ────────────────────────────────────────
  // Fayllarni /public/photos/ ichiga aynan shu nomlar bilan tashlang:
  // her-1.jpg ... her-6.jpg. Caption — rasm ostidagi yozuv.
  photos: [
    { src: "/photos/her-1.jpg", caption: "The moment everything changed", rotate: -6 },
    { src: "/photos/her-2.jpg", caption: "A smile I never forgot", rotate: 4 },
    { src: "/photos/her-3.jpg", caption: "Some days stay with you forever", rotate: -3 },
    { src: "/photos/her-4.jpg", caption: "Quiet places, loud heartbeats", rotate: 6 },
    { src: "/photos/her-5.jpg", caption: "Where it all quietly began", rotate: -5 },
    { src: "/photos/her-6.jpg", caption: "And still, no one shines like you", rotate: 3 },
  ],

  // ── 4. SEVGI HIKOYASI (STORY / TIMELINE) ─────────────────────
  timeline: [
    {
      date: "The Beginning",
      title: "The day we met",
      text: "It was an ordinary day that turned out to be anything but. You were there — and time just slowed down. I didn't know it yet, but everything was about to change.",
    },
    {
      date: "All The Time Between",
      title: "Knowing you, from near and far",
      text: "Different paths, life pulling us in every direction — and still, not a single day went by without you crossing my mind.",
    },
    {
      date: "The Realization",
      title: "It was always you",
      text: "I kept waiting for the feeling to fade. It never did. Not different like anyone else — different like no one else. Different like home.",
    },
    {
      date: "Today",
      title: "Why I'm finally saying it",
      text: `I've stayed quiet long enough. I'm done staying quiet. To see you, to sit across from you just once — I'd give anything. So here I am, ${HER_NAME}, finally brave enough.`,
    },
  ],

  // ── KINEMATIK XABARLAR (so'zma-so'z ochiladi) ────────────────
  messages: [
    "For so long I've known one thing for certain...",
    "Through every day, every silence, every 'someday'...",
    "It was always...",
    `You, ${HER_NAME}.`,
  ],

  // ── SEVGI XATI ───────────────────────────────────────────────
  letter: {
    greeting: `To ${HER_NAME},`,
    paragraphs: [
      "I have started this letter a hundred times, and every version fell short — because how do you fit so many quiet feelings into a few lines?",
      "It began on an ordinary day. And instead of anything else, I learned you — your smile, the way you made an ordinary room feel warmer. I've known and cared for you ever since, without ever really saying it.",
      "I'm not asking for the world. I'm asking for one moment: to see you, to sit with you, just once. For that, I'd cross any distance and give anything.",
    ],
    signoff: "Yours, all this time,",
    signature: "Me",
  },

  // ── ASOSIY SAVOL ─────────────────────────────────────────────
  proposal: {
    lead: "After all this time, there's only one thing left to ask...",
    question: "Date With Me?",
    // Savol ostida ko'rinadigan shaxsiy izoh
    note: `${HER_NAME} — seni ilk ko'rgan kunimdan beri yuragimda saqlab yuraman. Seni bir bora ko'rish, yoningda bo'lish uchun hamma narsaga tayyorman.`,
    yes: "YES",
    notYet: "No",
    yesResponse: "You just made all this waiting worth it",
    notYetResponse: "I'll wait... I've waited this long. You're worth every second.",
  },

  // ── UCHRASHUV REJASI (YES dan keyin ko'rinadi) ───────────────
  datePlanner: {
    intro: "Endi birinchi uchrashuvimizni birga chizamiz. Har bir tanlov — seniki 💛",
    steps: [
      {
        key: "place",
        title: "Qayerda uchrashamiz?",
        subtitle: "Aytgin — men o'sha yerni butun dunyodagi eng chiroyli joyga aylantiraman.",
        options: ["Sham yoritilgan restoran", "Kichkina, shinam kafe", "Ko'l bo'yida, suv sadosi ostida", "Yulduzlar tagida — park", "Uyda — sen uchun o'zim pishiraman"],
      },
      {
        key: "when",
        title: "Qachon?",
        subtitle: "Sen aytgan kun — mening yilimning eng go'zal kuni bo'ladi.",
        options: ["Bugun — bir soniya ham kutolmayman", "Ertaga", "Shu hafta oxiri", "Sen ayt — men doim tayyorman"],
      },
      {
        key: "food",
        title: "Nima yeymiz, nimadan shirin?",
        subtitle: "Menga baribir nima — muhimi ro'paramda sen o'tirasan.",
        options: ["Milliy taomlar — issiq va mehr bilan", "Pitsa & birga kulgi", "Romantik steyk kechasi", "Tort va shirinliklar", "Bir kosadan muzqaymoq — ikkovimizga"],
      },
      {
        key: "drink",
        title: "Ichimlik?",
        subtitle: "Qadahlarni to'qnashtiramiz — nihoyat, shu lahzaga.",
        options: ["Issiq qahva, sokin suhbat", "Choy — uzoq gaplar uchun", "Smuzi / fresh", "Salqin limonad", "Issiq shokolad — sovuq kechada"],
      },
      {
        key: "time",
        title: "Kunduzimi yoki kechasi?",
        subtitle: "Quyosh ostidami yoki yulduzlar tagida — ikkalasida ham sen porlaysan.",
        options: ["Kunduzi ☀️ — yorug'likda", "Kun botganda 🌆 — oltin soatda", "Kechasi 🌙 — yulduzlar guvohligida"],
      },
    ],
    doneTitle: "Bizning birinchi uchrashuvimiz 💫",
    doneSubtitle: "Mana, boshlanishi. Endi buni haqiqatga aylantirish menga qoldi.",
  },

  // Ixtiyoriy: /public/audio/voice-message.mp3 qo'ysangiz,
  // ovozli xabar pleyeri avtomatik paydo bo'ladi.
  voiceMessage: {
    src: "/audio/voice-message.mp3",
    label: `${HER_NAME}, I recorded something I've never had the courage to say...`,
  },

  // Yashirin yurakchalar — topganda ochiladigan sirlar.
  secrets: [
    "You found a secret! Here it is: I still remember exactly the first moment I saw you.",
    "Another secret: your name has been the one I never stopped thinking about.",
    "Last secret: I rehearsed this a hundred times in my head before I finally pressed 'send'.",
  ],
};

export type PhotoItem = (typeof content.photos)[number];
export type TimelineItem = (typeof content.timeline)[number];
