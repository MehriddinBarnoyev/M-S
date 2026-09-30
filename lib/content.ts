/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE — everything personal lives here.
 *  Photos go in /public/photos/  (see /public/photos/README.md)
 *
 *  Bu sayt endi Dilnurani bitta UCHRASHUVGA taklif qilish uchun.
 *  Bir marta ro'para o'tirib, kelajak va u xohlagan narsalar
 *  haqida ochiq gaplashish uchun. Butun matn hurmat shaklida
 *  ("siz") yozilgan.
 * ─────────────────────────────────────────────────────────────
 */

export const content = {
  herName: "Dilnura",

  // `?nobday` bilan ochilganda ko'rinadigan zaxira intro.
  intro: {
    line: "Dilnura... sizga bir og'iz gapim bor. Aytishga jur'at qildim.",
    cta: "Boshlash",
    hint: "quloqchin bilan eshitsangiz yaxshiroq",
  },

  // ── HERO ────────────────────────────────────────────────────
  hero: {
    kicker: "bitta iltimos — bitta uchrashuv",
    greeting: "Meni bir marta eshiting,",
    title: "Dilnura",
    typed: [
      "Sizni juda sog'indim...",
      "Bir marta ro'paringizda o'tirmoqchiman.",
      "Kelajak haqida — siz xohlagan narsalar haqida.",
      "Faqat bir uchrashuv. Boshqa hech narsa.",
    ],
    scrollHint: "pastga suring — hamma gapni shu yerga yozdim",
  },

  // ── UCHRASHUVGACHA / JAVOBNI KUTIB ──────────────────────────
  countdown: {
    lead: "sizni ko'radigan kunimgacha qoldi...",
    note: "...3-oktabr. O'sha kuni bir lahza ko'rsam ham, men uchun yetarli.",
    labels: { days: "kun", hours: "soat", minutes: "daqiqa", seconds: "soniya" },
    todayLead: "bugun — o'sha kun, 3-oktabr",
    todayNote: "Men shu yerdaman. Bir lahza bo'lsa ham, sizni ko'rsam bo'lgani.",
  },

  // ── PHOTO STORY ──────────────────────────────────────────────
  // Rasmlarni /public/photos ichiga tashlang va shu yerda ro'yxatlang.
  // Fayl bo'lmasa, chiroyli o'rinbosar ko'rinadi.
  photoStory: {
    script: "yodimda qolganlar",
    title: "Sizni shunday eslayman",
    footer: "Har bir kadrda — bir lahza, va o'sha lahzalarni sog'inganim.",
    placeholder: "rasmingiz shu yerga",
  },
  photos: [
    { src: "/photos/her-1.jpg", caption: "Kechki chiroqlar — va sizning qarashingiz", rotate: -6 },
    { src: "/photos/her-2.jpg", caption: "Mehringiz — hatto kichkintoylar ham sezadi", rotate: 4 },
    { src: "/photos/her-3.jpg", caption: "Tabassumingiz — men sog'ingan yagona narsa", rotate: -3 },
    { src: "/photos/her-4.jpg", caption: "Kafe, oq gullar — va faqat siz fokusda", rotate: 6 },
    { src: "/photos/her-5.jpg", caption: "O'sha talabalik yillari — hammasi shundan boshlangan", rotate: -5 },
    { src: "/photos/her-6.jpg", caption: "Bahor — lekin gul ham sizga yeta olmadi", rotate: 3 },
  ],

  // ── SIZNING HIKOYANGIZ ──────────────────────────────────────
  timeline: {
    script: "qisqacha",
    title: "Nega shu yerdaman",
    items: [
      {
        date: "~8 yil oldin",
        title: "Ingliz tili darsi",
        text: "Oddiy bir darsga kirdim — va boshqa odam bo'lib chiqdim. Siz o'sha yerda o'tirgandingiz. Ismingizni ham bilmasdim, lekin nimadir menga bu muhimligini aytdi.",
      },
      {
        date: "O'tgan barcha yillar",
        title: "Aytolmagan gaplar",
        text: "Yetti, deyarli sakkiz yil. Qayerda bo'lsam ham, xayolimda bir jumla aylanardi. Ayta olmadim — qo'rqdim, sizni bezovta qilishdan cho'chidim. Lekin his hech qayerga ketmadi.",
      },
      {
        date: "So'nggi paytlar",
        title: "Sog'inch",
        text: "Sizni juda sog'indim. Bu shunchaki so'z emas — kunlarim ichida bir joy bo'sh turibdi. Bir lahza ko'rish uchun ham har narsaga tayyorman.",
      },
      {
        date: "Bugun",
        title: "Jur'at",
        text: "Shuning uchun bu safar jim turmadim. Butun gapimni shu sahifaga yozdim. Chunki bir marta bo'lsa ham, ochiq va to'g'ri gaplashishimizni istayman.",
      },
      {
        date: "Oldinda",
        title: "Bitta uchrashuv",
        text: "Men sizdan ko'p narsa so'ramayapman. Faqat bitta uchrashuv — ro'para o'tirib, kelajak va siz xohlagan narsalar haqida suhbatlashaylik. Qolganini o'zingiz hal qilasiz.",
      },
    ],
  },

  // ── KINO KABI XABARLAR (so'zma-so'z ochiladi) ───────────────
  messages: [
    "Bir gap bor — uni yillar davomida ichimda saqladim...",
    "Sizni sog'indim. Rostdan ham, juda.",
    "Va bir marta ro'paringizda o'tirib aytmoqchiman.",
    "Meni bir uchrashuvga arzitasizmi, Dilnura?",
  ],

  // ── YULDUZLAR ───────────────────────────────────────────────
  stars: {
    script: "sokin bir tilak",
    title: "Yulduzlarni uyg'oting",
    hint: "Barmog'ingizni uxlab yotgan yulduzlar ustidan yurgizing... har birida aytolmagan bir gapim bor.",
    counter: "yulduz uyg'ondi",
    reveal: "Shu yulduzlarning har biri bitta narsani takrorlaydi: sizni bir ko'rsam bo'lgani.",
  },

  // ── XAT ──────────────────────────────────────────────────────
  letter: {
    script: "muhrlangan, faqat siz uchun",
    title: "Sizga xat",
    cta: "ochish uchun bosing",
    greeting: "Aziz Dilnura,",
    paragraphs: [
      "Bu xatni yuz marta boshladim va yuz marta o'chirdim — chunki eng muhim gapni aytish eng qiyini ekan. Shuning uchun to'g'ridan aytaman: sizni juda sog'indim, va siz men uchun oddiy bir inson emassiz. Siz mening muhabbimsiz.",
      "Mendan qo'rqishingizga hech qanday sabab yo'q. Men sizga hech qachon yuk, tashvish yoki bosim bo'lishni istamayman. Aksincha — sizni eng yaqin insonlaringiz qanchalik avaylasa, men ham xuddi shunday, balki undan ham ko'proq himoya qilishni, qadrlashni istayman. Yoningizda o'zingizni xotirjam his qilishingiz men uchun hammasidan muhim.",
      "Sizdan ko'p narsa so'ramayapman. Faqat bitta uchrashuv. Ro'para o'tirib, kelajak haqida, siz nimalarni xohlashingiz haqida ochiq gaplashaylik. Meni tinglang, o'zingizni ham ayting — shu bo'lsa yetadi.",
      "Va agar shu uchrashuvdan keyin ham siz uchun hech narsa o'zgarmasa — men buni tushunaman va hurmat qilaman. O'shanda siz xohlaganingizdek, sizni boshqa hech qachon bezovta qilmayman. Bu — va'dam. Lekin bir marta bo'lsa ham ro'paringizda o'tirib bu gaplarni aytish men uchun juda muhim. Bir lahza ko'rish uchun ham har narsaga tayyorman.",
    ],
    signoff: "Sizni chin dildan sog'ingan biri,",
    signature: "Men",
  },

  // Ixtiyoriy: /public/audio/voice-message.mp3 qo'ysangiz,
  // ovozli xabar pleyeri o'zi paydo bo'ladi.
  voiceMessage: {
    src: "/audio/voice-message.mp3",
    label: "Dilnura, yozib bo'lmaydigan gaplarni ovozimda aytdim...",
  },

  // ── UCHRASHUV / TAKLIF ──────────────────────────────────────
  // Sayt doim shu rejimda ochiladi. `?nobday` — sinash uchun o'chiradi.
  // (Eslatma: pastdagi kalitlar kod ichida ishlatilgani uchun nomi
  //  o'zgartirilmadi; faqat matnlar taklif ruhida qayta yozildi.)
  birthday: {
    monthDay: "10-03", // uchrashuv sanasi — sanoq shu kungacha teskari sanaydi

    birthDate: null as string | null,
    turning: null as number | null,

    // ── Kirish sahnasi (saytga kirgan zahoti) ─────────────────
    intro: {
      line: "Sizga bo'lgan his uchun bitta sham yoqdim. Bir tilak tilab, uni puflab qo'ying.",
      cta: "Shamni ko'rish",
      candlesTitle: "Siz uchun bir sham",
      candlesTitleFallback: "Sham siz uchun yoqildi",
      blowHint: "Shamni puflab o'chiring — telefonni yaqin tutib, sekin puflasangiz bo'ldi.",
      micButton: "Mikrofonni yoqaman va puflayman",
      micDenied: "Mikrofon ochilmadi — hechqisi yo'q, pastdagini bosib o'chirsangiz ham bo'ladi.",
      tapButton: "yoki shu yerni bosib o'chiring",
      listening: "Eshitib turibman... puflayvering 🤍",
      wishHint: "Puflashdan oldin bir tilak tilang — men ham xuddi shuni tilayapman.",
      done: "Endi qolgan gaplarni aytsam bo'ladimi, Dilnura?",
      doneNote: "Tilagingiz ro'yobga chiqsin. Meniki esa — sizni bir ko'rish edi.",
      continue: "Davom etish",
    },

    // ── Sahifadagi taklif bo'limi ─────────────────────────────
    section: {
      script: "bitta iltimos",
      title: "Meni bir uchrashuvga arzitasizmi?",
      lead: "Sizdan ko'p narsa emas — faqat bir marta ro'para o'tirib gaplashishni so'rayapman. Shu yerda, faqat siz uchun, hamma gapni ochiq yozdim.",
      todayLabel: "Sizni oxirgi ko'rmaganimga",
      livedLabel: "Sizni sog'inganimga",
      livedUnit: "kun",
      livedTail: "— va ularning har birida sizni o'yladim.",
      turningLabel: "bitta uchrashuv, xolos",
    },

    // ── Sovg'a emas — va'dalar qutisi ─────────────────────────
    giftsTitle: "Sizga bergan va'dalarim",
    giftsSubtitle: "Har birini bosib oching. Shoshilmang — ular kutadi.",
    giftOpened: "ochilgan",
    giftClose: "yopish",
    giftAllOpened: "Va'dalarning hammasi ochildi 🤍",
    gifts: [
      {
        title: "Hurmat haqida",
        text: "Nima bo'lishidan qat'i nazar, sizning tanlovingizni hurmat qilaman. Siz hech narsaga majbur emassiz — bu uchrashuv ham faqat siz xohlasangiz bo'ladi.",
      },
      {
        title: "Qo'rquv haqida",
        text: "Mendan qo'rqishingizga hech qanday sabab yo'q. Men sizga tinchlik istayman, tashvish emas. Yonimda o'zingizni bexavotir his qilishingizni xohlayman.",
      },
      {
        title: "Himoya haqida",
        text: "Sizni eng yaqin insonlaringiz qanday avaylasa, men ham xuddi shunday himoya qilaman. Sizga yomonlik tilaydigan emas, panoh bo'ladigan odam bo'lishni istayman.",
      },
      {
        title: "Sog'inch haqida",
        text: "Sizni juda sog'indim. Buni yashirmayman. Bir lahza ko'rish uchun ham har narsaga tayyorman — shuning uchun shu jur'atni topdim.",
      },
      {
        title: "Kelajak haqida",
        text: "Uchrashsak, kelajak haqida — siz nimalarni xohlashingiz haqida ochiq gaplashaylik. Men eshitaman. Siz haqingizda ko'proq bilishni istayman.",
      },
      {
        title: "Erkinligingiz haqida",
        text: "Agar shu uchrashuvdan keyin ham siz uchun hech narsa o'zgarmasa — siz xohlaganingizdek, sizni boshqa hech qachon bezovta qilmayman. Bu — mening va'dam.",
      },
      {
        title: "Bir iltimos",
        text: "Faqat bitta uchrashuv so'rayapman. Ro'para o'tirib, ko'zingizga qarab, shu gaplarni o'zim aytishim uchun. Undan ortig'i — sizning ixtiyoringizda.",
      },
      {
        title: "Oxirgi va'da",
        text: "Nima javob bersangiz ham, siz men uchun muhabbat bo'lib qolasiz. Sizga rahmat — shu paytgacha, shu satrlarni o'qiganingiz uchun ham.",
      },
    ],

    // ── Yozadigan javob (menga Telegramga keladi) ─────────────
    wish: {
      script: "shivirlab ayting",
      title: "Menga bir og'iz yozing",
      subtitle: "Ko'nglingizdagini shu yerga yozing. U faqat menga keladi — va men eshitishga tayyorman, javob qanday bo'lsa ham.",
      placeholder: "Men aytmoqchi bo'lgan narsa...",
      send: "Yuborish",
      sending: "Yuborilmoqda...",
      thanks: "Xabaringiz menga yetib keldi 🤍",
      thanksNote: "Rahmat — javob berganingiz o'zi men uchun ko'p narsa.",
    },

    // ── Yuklab olinadigan karta ────────────────────────────────
    card: {
      script: "esdalik",
      title: "Kichkina esdalik",
      subtitle: "Shu sahifaning kichik esdaligi — yuklab oling va saqlab qo'ying.",
      button: "Kartani yuklab olish",
      saved: "Yuklab olindi 🤍",
      alt: "Esdalik kartasi",
      greeting: "Sizni sog'indim,",
      dateLine: "3 oktabr 2026",
      ageLine: "",
      quote: "Bir marta ro'paringizda o'tirsam —\nqolgan hamma gapni ko'zingizga qarab aytaman.",
      signoff: "sizdan bir kun ham voz kechmagan biri",
    },

    // ── Telegram/WhatsApp havola ko'rinishi ───────────────────
    share: {
      title: "Dilnura, sizga bir gapim bor 🤍",
      description: "Bir marta ochib o'qing — hammasini shu yerga yozdim ♥",
      tagline: "Ochib ko'ring — sizga aytilmagan gaplar shu yerda",
    },

    // ── FINAL: uchrashamizmi? ─────────────────────────────────
    finale: {
      lead: "Endi hammasini aytdim. Bitta savol qoldi...",
      question: "3-oktabr kuni uchrashamizmi?",
      note: "Dilnura — hamma gapni ochiq yozdim: sizni sog'inganimni, himoya qilishimni, mendan qo'rqmaslik kerakligini. 3-oktabr kuni bir marta ro'para o'tirib gaplashaylik. Agar keyin ham hech narsa o'zgarmasa — siz xohlaganingizdek, sizni boshqa bezovta qilmayman.",
      yes: "HA 🤍",
      notYet: "Yo'q",
      nudges: [
        "hmm... shoshmang, o'ylab ko'ring 😊",
        "bu tugma tanlanishni xohlamayapti...",
        "faqat bitta uchrashuv-ku...",
        "ushlay olmaysiz — u mening tarafimda 🤍",
        "bir marta «ha» deng... ko'p emas 🙂",
      ],
      yesResponse: "Rahmat, Dilnura. Bu ishonch men uchun juda qimmatli.",
    },

    // ── Uchrashuv rejasi (u HA deganidan keyin) ───────────────
    party: {
      intro: "Unda uchrashuvni birga rejalashtiraylik. Har bir tanlov — sizniki 🤍",
      steps: [
        {
          key: "place",
          title: "Qayerda uchrashamiz?",
          subtitle: "O'zingizni bemalol his qiladigan joyni tanlang — men moslashaman.",
          options: [
            "Kichkina, shinam kafe",
            "Odamlar ko'p, ochiq bir joy",
            "Ko'l yoki daryo bo'yi",
            "Park — havoda sayr qilamiz",
            "O'zingiz tanlagan, xavfsiz joy",
          ],
        },
        {
          key: "when",
          title: "Qachon uchrashamiz?",
          subtitle: "Siz qulay bo'lgan kun — mening uchun eng yaxshi kun bo'ladi.",
          options: [],
        },
        {
          key: "cake",
          title: "Nima haqida gaplashamiz?",
          subtitle: "Nimadan boshlasak, siz uchun oson bo'ladi?",
          options: [
            "Kelajak — rejalarimiz haqida",
            "Siz nimalarni xohlaysiz",
            "O'tgan kunlar, oddiy suhbat",
            "Savollaringiz — men rostini aytaman",
            "Shunchaki tanishaylik, boshidan",
          ],
        },
        {
          key: "gift",
          title: "Yonimda o'zingizni qanday his qilishni istaysiz?",
          subtitle: "Men shunga qarab bo'laman.",
          options: [
            "Xotirjam va bemalol",
            "Hech qanday bosimsiz",
            "Eshitilgan — gapim tinglangan",
            "Xavfsiz va himoyalangan",
            "Shunchaki o'zim bo'lib",
          ],
        },
        {
          key: "vibe",
          title: "Uchrashuv qanday bo'lsin?",
          subtitle: "Qisqami yoki shoshilmasdanmi — o'zingiz ayting.",
          options: [
            "Qisqa — bir choy ustida",
            "Shoshilmasdan, dildan suhbat",
            "Sayr qilib, yengil gaplashib",
            "Kun botganda — sokin payt",
            "O'zingizga qulay bo'lganidek",
          ],
        },
      ],
      doneTitle: "Bizning uchrashuv rejamiz 🤍",
      doneSubtitle: "Mana, uchrashuvimiz shunday bo'ladi. Endi buni haqiqatga aylantirish menga qoldi.",
      closing: "Sizni ko'rishga sanoqli kunlar qoldi, Dilnura 🤍",
      savedNote: "💾 Reja telefoningizga rasm bo'lib saqlandi",
      cardSubtitle: "Bizning uchrashuvimiz",
      cardClosing: "Ro'para o'tirib gaplashamiz 🤍",
    },

    // ── U menga yozadigan javob qutisi ────────────────────────
    reply: {
      title: "Menga bir narsa yuborasizmi?",
      subtitle: "Yozing, rasm tashlang, video yoki ovozli xabar yuboring — o'zingiz tanlang 🤍",
      placeholder: "Yuragingizdagini shu yerga yozing...",
      photo: "Rasm",
      video: "Video",
      audio: "Ovoz",
      stop: "To'xtatish",
      recording: "Yozilyapti... gapiravering 🎙",
      audioReady: "🎙 Ovozli xabar tayyor",
      tooBig: "Fayl juda katta (max {n}MB). Qisqaroq video/rasm tanlab ko'ring.",
      remove: "O'chirish",
      send: "Yuborish",
      sentTitle: "Yuborildi — rahmat, Dilnura",
      sentNote: "Har bir so'zingiz men uchun qimmatli. Javobingizni kutaman.",
    },
  },

  // Yashirin gaplar — topib oladigan kichkina sirlar.
  secrets: [
    "Bir sir topdingiz! Bu sahifadagi har bir jumlani sizni o'ylab yozganman.",
    "Yana bir sir: sizni bezovta qilishdan qo'rqib, bu gaplarni yillar davomida ichimda saqlaganman.",
    "Oxirgi sir: men faqat bitta narsani xohlayman — bir marta ro'paringizda o'tirib, shularni o'zim aytishni.",
  ],
};

export type PhotoItem = (typeof content.photos)[number];
export type TimelineItem = (typeof content.timeline.items)[number];
