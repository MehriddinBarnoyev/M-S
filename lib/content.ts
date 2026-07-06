/**
 * ─────────────────────────────────────────────────────────────
 *  BU FAYLNI TAHRIRLANG — barcha shaxsiy ma'lumot shu yerda.
 *  Rasmlar /public/ ichida turadi  (her-1.jpg ... her-5.jpg)
 * ─────────────────────────────────────────────────────────────
 */

export const content = {
  herName: "Sevinch",

  // Tanishgan kun — jonli hisoblagichni ishlatadi. Format: YYYY-MM-DDTHH:mm:ss
  // ~ bir necha oy oldin (taxminan 4-5 oy).
  metDate: "2026-02-20T20:00:00",

  intro: {
    line: "Sevinch... bir yigit buni bir necha oydan beri yuragida saqlab yuribdi.",
  },

  hero: {
    kicker: "Bir necha oy ichida yashiringan tuyg'u",
    title: "Sevinch uchun",
    typed: [
      "Hammasi bir necha oy oldin boshlandi...",
      "Biz hali yuzma-yuz ko'rishmadik — lekin men buni chin dildan istayman...",
      "Nihoyat, buni aytishga jur'at qildim.",
    ],
  },

  // ── RASMLAR HIKOYASI ─────────────────────────────────────────
  // Rasmlarni /public/ ichiga tashlang va shu yerda ro'yxatga oling.
  // Agar fayl bo'lmasa, chiroyli placeholder ko'rsatiladi.
  photos: [
    { src: "/her-1.jpg", caption: "Kulgingdagi samimiylik — uni hech narsaga almashmayman", rotate: -6 },
    { src: "/her-2.jpg", caption: "Ko'zlaringdagi orzu — kelajaging shu qadar yorug'", rotate: 4 },
    { src: "/her-3.jpg", caption: "Uzoqda bo'lsang ham, yuragimga eng yaqin insonsan", rotate: -3 },
    { src: "/her-4.jpg", caption: "Maqsadlaring katta — va men ularga yetishingda yoningdaman", rotate: 6 },
    { src: "/her-5.jpg", caption: "Hali ko'rishmagan bo'lsak ham, men seni allaqachon qadrlayman", rotate: -5 },
  ],

  // ── HIKOYA — VAQT CHIZIG'I ──────────────────────────────────
  timeline: [
    {
      date: "Bir necha oy oldin",
      title: "Hammasi shunday boshlandi",
      text: "Bundan bir necha oy oldin sen mening hayotimga kirib kelding. Biz yuzma-yuz ko'rishmagan bo'lsak ham, o'sha kundan boshlab sen mening xayolimdan ketmay qolding. Hali ismingni yaxshi bilmasdim, lekin negadir shu tuyg'u muhim bo'lishini his qilgandim.",
    },
    {
      date: "O'tgan oylar",
      title: "Uzoqdan bo'lsa ham, seni bilib bordim",
      text: "Bu oylar davomida seni tanidim — tirishqoqligingni, orzularingni, yuragingdagi mehringni. Sen bu yil maktabni bitirasan, oldingda esa katta yo'l turibdi. Bu oylarning birortasi ham sensiz o'tmadi.",
    },
    {
      date: "Anglash",
      title: "Bu — sen eding",
      text: "Men bu hissiyot o'tib ketishini kutdim. U ketmadi. Sen boshqachasan, Sevinch — hech kimga o'xshamaysan. Va men bir narsani angladim: sening orzularing endi mening ham orzularimga aylandi.",
    },
    {
      date: "Bugun",
      title: "Nega nihoyat aytyapman",
      text: "Shuncha vaqt jim yurdim. Endi jim turishni istamayman. Seni bir bora yuzma-yuz ko'rish, ro'paramda o'tirganingni ko'rish uchun hamma narsaga tayyorman. Mana, Sevinch, nihoyat jur'at qildim.",
    },
  ],

  // ── KINO USLUBIDAGI XABARLAR (so'zma-so'z ochiladi) ─────────
  messages: [
    "Bir necha oydan beri men bir narsani aniq bilaman...",
    "Seni tanigan o'sha kundan beri...",
    "Bu doim...",
    "Sen eding, Sevinch.",
  ],

  // ── SEVGI XATI ──────────────────────────────────────────────
  letter: {
    greeting: "Sevinchga,",
    paragraphs: [
      "Bu xatni yuz marta boshladim, va har safar so'zlar kamlik qildi — chunki bir necha oylik sokin hislarni bir necha satrga qanday sig'dirasan?",
      "Hammasi bir necha oy oldin boshlandi. Biz hali bir marta ham yuzma-yuz ko'rishmadik, lekin sen allaqachon mening kunlarimning eng yorug' qismiga aylanding. Sen bu yil maktabni bitirasan, orzularing baland — va men senga so'z beraman: o'sha orzularga yetishingda men doim yoningda bo'laman.",
      "Men sendan dunyoni so'ramayman. Men faqat bitta lahzani so'rayman: seni bir bora ko'rishni, yoningda o'tirishni. Qancha masofa bo'lsa ham, o'sha bir lahza uchun men hamma narsani berardim.",
    ],
    signoff: "Seni kutayotgan,",
    signature: "Men",
  },

  // ── ASOSIY SAVOL ────────────────────────────────────────────
  proposal: {
    lead: "Bir necha oydan keyin, aytadigan bitta narsa qoldi...",
    question: "Men bilan uchrashasanmi?",
    // Savol tagida ko'rsatiladigan shaxsiy izoh
    note: "Sevinch — seni tanigan kunimdan beri xayolimdan ketmaysan. Biz hali yuzma-yuz ko'rishmadik, lekin men buni juda istayman. Sen bu yil maktabni bitirasan, orzularing katta — va men ularga yetishingda doim yoningda bo'laman. Seni bir bora ko'rish, yoningda bo'lish uchun hamma narsaga tayyorman.",
    yes: "HA",
    notYet: "Yo'q",
    yesResponse: "Sen shu paytgacha kutganlarimning barchasini oqlading",
    notYetResponse: "Kutaman... shuncha kutdim-ku. Sen har bir soniyaga arziysan.",
  },

  // ── UCHRASHUV REJASI (u HA deganidan keyin ko'rinadi) ───────
  datePlanner: {
    intro: "Bir necha oy kutdim... endi esa birinchi uchrashuvimizni birga chizamiz. Har bir tanlov — seniki 💛",
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
          "Kutubxona yoki kitob do'koni — sokin va iliq",
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
        subtitle: "Quyosh ostidami yoki yulduzlar tagida — ikkalasida ham sen porlaysan.",
        options: ["Kunduzi ☀️ — yorug'likda", "Kun botganda 🌆 — oltin soatda", "Kechasi 🌙 — yulduzlar tagida"],
      },
    ],
    doneTitle: "Bizning birinchi uchrashuvimiz 💫",
    doneSubtitle: "Bir necha oy kutdim — mana, boshlanishi. Endi buni haqiqatga aylantirish menga qoldi.",
  },

  // Ixtiyoriy: /public/audio/voice-message.mp3 ga mp3 qo'ying
  // va ovozli xabar pleeri avtomatik paydo bo'ladi.
  voiceMessage: {
    src: "/audio/voice-message.mp3",
    label: "Sevinch, men aytishga jur'at etolmagan bir narsani ovozimga yozib qoldirdim...",
  },

  // Yashirin yuraklar — u topa oladigan kichik sirlar.
  secrets: [
    "Bir sir topding! Mana: biz hali yuzma-yuz ko'rishmagan bo'lsak ham, seni birinchi tanigan kunimdagi his hali ham yuragimda.",
    "Yana bir sir: bir necha oydan beri seni o'ylashni to'xtatmadim. Sevinch — isming ham 'quvonch' degani. Sen menga aynan shuni olib kelding.",
    "Oxirgi sir: buni yuz marta xayolimda mashq qildim. Sen bu yil maktabni bitirasan, orzularing katta — va men o'sha orzularga yetishingda doim yoningda bo'laman.",
  ],
};

export type PhotoItem = (typeof content.photos)[number];
export type TimelineItem = (typeof content.timeline)[number];
