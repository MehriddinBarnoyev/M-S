/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE — everything personal lives here.
 *  Photos go in /public/photos/  (see /public/photos/README.md)
 * ─────────────────────────────────────────────────────────────
 */

export const content = {
  herName: "Sevinch",

  // The day you met — powers the live countdown. Format: YYYY-MM-DDTHH:mm:ss
  // ~4 years ago, on a quiet street at night.
  metDate: "2022-07-06T22:30:00",

  intro: {
    line: "Sevinch... someone has been holding this in for 4 whole years.",
  },

  hero: {
    kicker: "Four years in the making",
    title: "For Sevinch",
    typed: [
      "It started on a street, late at night...",
      "One glance under the streetlights, and I never really looked away...",
      "Four years later, I'm finally saying it.",
    ],
  },

  // ── PHOTO STORY ──────────────────────────────────────────────
  // Drop images into /public/photos and list them here.
  // If a file doesn't exist yet, an elegant placeholder is shown.
  photos: [
    { src: "/photos/her-1.jpg", caption: "Night lights, and the way you looked away — I never could", rotate: -6 },
    { src: "/photos/her-2.jpg", caption: "The gentleness in you — even the little ones feel it", rotate: 4 },
    { src: "/photos/her-3.jpg", caption: "Love is life — and your smile has always been the proof", rotate: -3 },
    { src: "/photos/her-4.jpg", caption: "A quiet café, white flowers, and only you in focus", rotate: 6 },
    { src: "/photos/her-5.jpg", caption: "The future lawyer — even justice looks softer next to you", rotate: -5 },
    { src: "/photos/her-6.jpg", caption: "Spring, and a flower that still couldn't outshine you", rotate: 3 },
  ],

  // ── LOVE STORY TIMELINE ─────────────────────────────────────
  timeline: [
    {
      date: "4 Years Ago",
      title: "A street, at night",
      text: "It was an ordinary night on an ordinary street — until you walked by. The streetlights were on, but I promise you, they weren't what lit up that street. I didn't know your name yet, but somehow I already knew that night would matter forever.",
    },
    {
      date: "The Years Between",
      title: "Knowing you, from near and far",
      text: "Four years. You buried yourself in law books, learning about justice and rules — and meanwhile you broke every rule my heart ever had, without even trying. Not a single one of those years went by without you on my mind.",
    },
    {
      date: "The Realization",
      title: "It was always you",
      text: "I kept waiting for the feeling to fade. It never did. You study the law, Sevinch — so you tell me: is there any law that explains how one person, seen once at night, can stay in a heart for four whole years? Different like no one else. Different like home.",
    },
    {
      date: "Today",
      title: "Why I'm finally saying it",
      text: "I've stayed quiet for 4 years. I'm done staying quiet. To see you, to sit across from you just once — I'd give anything. So here I am, Sevinch, finally brave enough.",
    },
  ],

  // ── CINEMATIC MESSAGES (word-by-word reveal) ────────────────
  messages: [
    "For 4 years I've known one thing for certain...",
    "Since that night, that street, that one glance...",
    "It was always...",
    "You, Sevinch.",
  ],

  // ── THE LOVE LETTER ─────────────────────────────────────────
  letter: {
    greeting: "To Sevinch,",
    paragraphs: [
      "I have started this letter a hundred times, and every version fell short — because how do you fit 4 years of quiet feelings into a few lines?",
      "It began on a street, at night. I was just walking, going nowhere special — and then there was you, under the streetlights, and suddenly that street became the most important place in the world. You went off to study law, to defend the truth — and here is my truth, held quietly for four years: it has always been you.",
      "I'm not asking for the world. I'm asking for one moment: to see you, to sit with you, just once. You're learning to argue every case, Sevinch — but don't argue this one. For that one moment, I'd cross any distance and give anything.",
    ],
    signoff: "Yours, for 4 years now,",
    signature: "Me",
  },

  // ── THE QUESTION ────────────────────────────────────────────
  proposal: {
    lead: "After 4 years, there's only one thing left to ask...",
    question: "Date With Me?",
    // Personal note (shown just under the question)
    note: "Sevinch — seni o'sha kechasi ko'chada ko'rib qolganimdan beri 4 yil o'tdi, hali ham o'shasan. Sen qonunlarni o'rganasan, lekin yuragimni qaysi qonun bilan olganingni hech topolmadim. Seni bir bora ko'rish, yoningda bo'lish uchun hamma narsaga tayyorman.",
    yes: "YES",
    notYet: "No",
    yesResponse: "You just made 4 years of waiting worth it",
    notYetResponse: "I'll wait... I've waited this long. You're worth every second.",
  },

  // ── THE DATE PLANNER (shown after she says YES) ─────────────
  datePlanner: {
    intro: "4 yil kutdim... endi esa birinchi uchrashuvimizni birga chizamiz. Har bir tanlov — seniki 💛",
    steps: [
      {
        key: "place",
        title: "Qayerda uchrashamiz?",
        subtitle: "Aytgin — men o'sha yerni butun dunyodagi eng chiroyli joyga aylantiraman.",
        options: [
          "Sham yoritilgan restoran",
          "Kichkina, shinam kafe",
          "Rooftop kafe — shahar tepasida, yulduzlarga yaqinroq",
          "Milliy restoran — osh, mehr va iliq muhit",
          "Italyan restorani — pasta va sokin musiqa",
          "Ko'l bo'yida, suv sadosi ostida",
          "Yulduzlar tagida — park",
          "Kinoteatr — bitta film, bitta popkorn ikkovimizga",
          "Anhor bo'yida piyoda sayr — shoshilmasdan",
          "O'sha ko'chada — hammasi boshlangan joyda",
          "Master Kebab — issiq va mazali",
        ],
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
        options: [
          "Milliy taomlar — issiq va mehr bilan",
          "Osh — bayramona, yurakdan",
          "Lag'mon — issiqqina, uzun suhbatlar kabi",
          "Shashlik — ochiq havoda, tutun hidi bilan",
          "Pitsa & birga kulgi",
          "Sushi kechasi — yangi ta'mlarni birga sinaymiz",
          "Italyancha pasta — bir tarelkadan bo'lsa ham mayli",
          "Burger & fri — oddiy, lekin quvnoq",
          "Romantik steyk kechasi",
          "Tort va shirinliklar",
          "Bir kosadan muzqaymoq — ikkovimizga",
        ],
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
        subtitle: "Quyosh ostidami yoki yulduzlar tagida — ikkalasida ham sen porlaysan. (Lekin tan olay — kechasi, chunki seni ilk bor kechasi ko'rganman.)",
        options: ["Kunduzi ☀️ — yorug'likda", "Kun botganda 🌆 — oltin soatda", "Kechasi 🌙 — hammasi boshlangan payt kabi"],
      },
    ],
    doneTitle: "Bizning birinchi uchrashuvimiz 💫",
    doneSubtitle: "4 yildan keyin — mana, boshlanishi. Endi buni haqiqatga aylantirish menga qoldi.",
  },

  // Optional: put an mp3 at /public/audio/voice-message.mp3
  // and the voice-message player will appear automatically.
  voiceMessage: {
    src: "/audio/voice-message.mp3",
    label: "Sevinch, I recorded something I've never had the courage to say...",
  },

  // Hidden easter-egg hearts — little secrets she can find.
  secrets: [
    "You found a secret! Here it is: I still remember exactly which street it was, and exactly how the night felt when I first saw you.",
    "Another secret: for 4 years, your name has been the one I never stopped thinking about. Sevinch — even your name means joy. That's exactly what you brought.",
    "Last secret: I rehearsed this a hundred times in my head. You're the law student — but it took me 4 years to build the courage to plead my case.",
  ],
};

export type PhotoItem = (typeof content.photos)[number];
export type TimelineItem = (typeof content.timeline)[number];
