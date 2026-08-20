/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE — everything personal lives here.
 *  Photos go in /public/photos/  (see /public/photos/README.md)
 *
 *  Bu sayt butunlay Dilnuraning TUG'ILGAN KUNI uchun.
 *  Butun matn hurmat shaklida ("siz") yozilgan.
 * ─────────────────────────────────────────────────────────────
 */

export const content = {
  herName: "Dilnura",

  // `?nobday` bilan ochilganda ko'rinadigan zaxira intro.
  intro: {
    line: "Dilnura... bugun siz uchun bir narsa tayyorladim.",
    cta: "Boshlash",
    hint: "quloqchin bilan eshitsangiz yaxshiroq",
  },

  // ── HERO ────────────────────────────────────────────────────
  hero: {
    kicker: "19 avgust — yilning eng muhim kuni",
    greeting: "Tug'ilgan kuningiz muborak,",
    title: "Dilnura",
    typed: [
      "Bugun 19-avgust...",
      "Ya'ni — siz dunyoga kelgan kun.",
      "Tug'ilgan kuningiz muborak 🎂",
      "Bu sahifaning har bir burchagi sizniki.",
    ],
    scrollHint: "pastga suring — bayram endi boshlandi",
  },

  // ── KEYINGI TUG'ILGAN KUNGACHA SANOQ ────────────────────────
  countdown: {
    lead: "keyingi tug'ilgan kuningizgacha qoldi...",
    note: "...va men allaqachon keyingi yilni rejalashtira boshladim.",
    labels: { days: "kun", hours: "soat", minutes: "daqiqa", seconds: "soniya" },
    todayLead: "bugun — o'sha kunning o'zi",
    todayNote: "Sanoq tugadi. Endi faqat nishonlash qoldi 🎉",
  },

  // ── PHOTO STORY ──────────────────────────────────────────────
  // Rasmlarni /public/photos ichiga tashlang va shu yerda ro'yxatlang.
  // Fayl bo'lmasa, chiroyli o'rinbosar ko'rinadi.
  photoStory: {
    script: "yillar bo'ylab",
    title: "Sizning kadrlaringiz",
    footer: "Har bir rasmda — yana bir yil, yana bir tabassum.",
    placeholder: "rasmingiz shu yerga",
  },
  photos: [
    { src: "/photos/her-1.jpg", caption: "Kechki chiroqlar — va sizning qarashingiz", rotate: -6 },
    { src: "/photos/her-2.jpg", caption: "Mehringiz — hatto kichkintoylar ham sezadi", rotate: 4 },
    { src: "/photos/her-3.jpg", caption: "Tabassumingiz — eng yaxshi tug'ilgan kun sovg'asi", rotate: -3 },
    { src: "/photos/her-4.jpg", caption: "Kafe, oq gullar — va faqat siz fokusda", rotate: 6 },
    { src: "/photos/her-5.jpg", caption: "O'sha talabalik yillari — hammasi shundan boshlangan", rotate: -5 },
    { src: "/photos/her-6.jpg", caption: "Bahor — lekin gul ham sizga yeta olmadi", rotate: 3 },
  ],

  // ── SIZNING HIKOYANGIZ ──────────────────────────────────────
  timeline: {
    script: "bob-bob",
    title: "Sizning hikoyangiz",
    items: [
      {
        date: "Yillar oldin, 19-avgust",
        title: "Dunyoga kelgan kun",
        text: "Bir kuni, xuddi bugungidek 19-avgustda, bu dunyoga siz kelgansiz. O'shanda hech kim bilmagan — lekin o'sha kun kimningdir butun hayotidagi eng muhim sanaga aylanishi kerak edi. Menikiga.",
      },
      {
        date: "~8 yil oldin",
        title: "Ingliz tili darsi",
        text: "Oddiy bir darsga kirdim — va boshqa odam bo'lib chiqdim. Siz o'sha yerda o'tirgandingiz. Ismingizni ham bilmasdim, lekin nimadir menga bu muhimligini aytdi.",
      },
      {
        date: "O'tgan barcha yillar",
        title: "Har bir 19-avgust",
        text: "Yetti, deyarli sakkiz yil. Har yili shu sana kelganda, qayerda bo'lsam ham, xayolimda bir jumla aylanardi: «bugun uning kuni». Ayta olmasam ham, hech birini o'tkazib yubormaganman.",
      },
      {
        date: "Bugun",
        title: "Yangi yoshingiz",
        text: "Bu yil esa jim turmadim. Bugun siz uchun butun boshli bir olam yasadim — tortlari, shamlari, sovg'alari va yulduzlari bilan. Hammasi bitta jumla uchun: tug'ilgan kuningiz muborak, Dilnura.",
      },
      {
        date: "Oldinda",
        title: "Keyingi 19-avgust",
        text: "Va agar ruxsat bersangiz — keyingi tug'ilgan kuningizni ekran orqali emas, ro'paringizda o'tirib tabriklamoqchiman. Tortni birga kesamiz. Shamlarni siz puflaysiz, men esa shunchaki qarab turaman.",
      },
    ],
  },

  // ── KINO KABI XABARLAR (so'zma-so'z ochiladi) ───────────────
  messages: [
    "Yilda bitta kun bor — u faqat sizga tegishli...",
    "Bugun aynan o'sha kun.",
    "Va men uni jimgina o'tkazib yubormoqchi emasman.",
    "Tug'ilgan kuningiz muborak, Dilnura.",
  ],

  // ── YULDUZLAR ───────────────────────────────────────────────
  stars: {
    script: "osmondagi sir",
    title: "Yulduzlarni uyg'oting",
    hint: "Barmog'ingizni uxlab yotgan yulduzlar ustidan yurgizing... ular bugun uchun bir narsa tayyorlagan.",
    counter: "yulduz uyg'ondi",
    reveal: "Bugun osmondagi har bir yulduz faqat siz uchun yondi.",
  },

  // ── TUG'ILGAN KUN XATI ──────────────────────────────────────
  letter: {
    script: "muhrlangan, faqat siz uchun",
    title: "Sizga xat",
    cta: "ochish uchun bosing",
    greeting: "Aziz Dilnura,",
    paragraphs: [
      "Bu xatni yuz marta boshladim va yuz marta o'chirdim — chunki bir yilni, ustiga deyarli sakkiz yilni bir necha satrga sig'dirib bo'lmas ekan.",
      "Bugun sizning kuningiz. Men sizga uzun tilaklar ro'yxatini yozmoqchi emasman. Faqat shuni bilishingizni istayman: bu dunyo siz tug'ilganingiz uchun menga ancha chiroyliroq ko'rinadi. Sizning kulgingiz, mehringiz, odamlarga bo'lgan munosabatingiz — bularning hech biri oddiy narsa emas.",
      "Yangi yoshingiz sizga xotirjamlik olib kelsin. Rejalaringiz ro'yobga chiqsin, charchaganingizda dam olishga vaqtingiz bo'lsin, va yoningizda sizni qadrlaydigan odamlar qolsin. Siz buning hammasiga arziysiz — bir kun ham emas, har kuni.",
      "Va agar shu yil bir marta bo'lsa ham ro'paringizda o'tirib «tug'ilgan kuningiz muborak» deyish nasib qilsa — men uchun bu yilning eng yaxshi kuni bo'ladi.",
    ],
    signoff: "Sizning kuningizni har yili eslab yuradigan biri,",
    signature: "Men",
  },

  // Ixtiyoriy: /public/audio/voice-message.mp3 qo'ysangiz,
  // ovozli xabar pleyeri o'zi paydo bo'ladi.
  voiceMessage: {
    src: "/audio/voice-message.mp3",
    label: "Dilnura, tug'ilgan kuningiz uchun ovozimda bir narsa yozib qo'ydim...",
  },

  // ── TUG'ILGAN KUN ────────────────────────────────────────────
  // Sayt doim tug'ilgan kun rejimida. `?nobday` — sinash uchun o'chiradi.
  birthday: {
    monthDay: "08-19", // MM-DD — sanoq va kartadagi sana uchun

    // Ixtiyoriy. Tug'ilgan yilini bilsangiz to'ldiring — masalan "2004-08-19T00:00:00".
    // To'ldirilsa "siz dunyoga kelganingizga ... kun" sanog'i qo'shimcha ko'rinadi.
    birthDate: null as string | null,
    // Nechanchi yoshga to'lyapti. Shamlar soni ham shundan olinadi.
    turning: 22 as number | null,

    // ── Tort sahnasi (saytga kirgan zahoti) ───────────────────
    intro: {
      line: "Bugun taqvimdagi eng muhim kun — chunki bugun siz tug'ilgansiz.",
      cta: "Tortni ko'rish",
      // {n} — shamlar soni (yoshi). Yosh berilmagan bo'lsa fallback ishlatiladi.
      candlesTitle: "Siz uchun {n} ta sham",
      candlesTitleFallback: "Shamlar siz uchun yoqildi",
      blowHint: "Shamlarni puflab o'chiring — telefonni yaqin tutib, sekin puflasangiz bo'ldi.",
      micButton: "Mikrofonni yoqaman va puflayman",
      micDenied: "Mikrofon ochilmadi — hechqisi yo'q, pastdagini bosib o'chirsangiz ham bo'ladi.",
      tapButton: "yoki shu yerni bosib o'chiring",
      listening: "Eshitib turibman... puflayvering 🎂",
      wishHint: "Puflashdan oldin bir tilak tilang.",
      done: "Tug'ilgan kuningiz muborak, Dilnura",
      doneNote: "Tilagingiz albatta ro'yobga chiqsin. Men shunga ishonaman.",
      continue: "Sovg'alarni ochish",
    },

    // ── Sahifadagi tug'ilgan kun bo'limi ──────────────────────
    section: {
      script: "19-avgust",
      title: "Tug'ilgan kuningiz muborak",
      lead: "Bugun butun dunyo siz uchun bir kunga to'xtab tursin. Men esa shu yerda, faqat siz uchun kichkina bir olam yasadim.",
      todayLabel: "Bugungi kuningiz boshlanganiga",
      livedLabel: "Siz dunyoga kelganingizga",
      livedUnit: "kun",
      livedTail: "— va ularning har biri uchun rahmat.",
      turningLabel: "yoshingiz muborak",
    },

    // ── Sakkizta sovg'a qutisi ────────────────────────────────
    giftsTitle: "Sakkizta quti — deyarli sakkiz yil uchun",
    giftsSubtitle: "Har birini bosib oching. Shoshilmang — ular kutadi.",
    giftOpened: "ochilgan",
    giftClose: "yopish",
    giftAllOpened: "Sakkizta qutining hammasi ochildi 🎉",
    gifts: [
      {
        title: "Bugun uchun",
        text: "Tug'ilgan kuningiz muborak, Dilnura. Bugun tug'ilganingiz uchun bu dunyo menga ancha chiroyliroq ko'rinadi.",
      },
      {
        title: "Kulgingiz uchun",
        text: "Sizning kulgingiz — men eshitgan eng yaxshi ovoz. Qanchalik charchagan kunim bo'lmasin, o'shani eslasam, yengil tortaman.",
      },
      {
        title: "Ko'zlaringiz uchun",
        text: "Ingliz tili darsida birinchi marta ko'zlaringizni ko'rganman. O'shandan beri hech qaysi qarash menga bunchalik tanish tuyulmagan.",
      },
      {
        title: "Mehringiz uchun",
        text: "Siz odamlarga qanday muomala qilishingizni ko'rganman — kichkinalarga ham, kattalarga ham. Mehrni o'rgatib bo'lmaydi; u sizda tug'ma.",
      },
      {
        title: "Kuchingiz uchun",
        text: "Qiyin kunlaringizni hech kimga bildirmasligingiz — zaiflik emas, kuch. Lekin bilib qo'ying: mendan yashirishingiz shart emas.",
      },
      {
        title: "Bir va'da",
        text: "Bu yil sizga hech narsa bilan yuk bo'lmayman. Faqat shuni biling — bir og'iz so'z yetarli, men shu yerdaman.",
      },
      {
        title: "Bir tilak",
        text: "Yangi yoshingiz sizni o'zingiz orzu qilgan joyga olib borsin. Va o'sha yo'lda, iloji bo'lsa, menga ham bir qadamlik joy qolsin.",
      },
      {
        title: "Oxirgi quti",
        text: "Sakkizta quti — deyarli sakkiz yil uchun. Har bir yili sizga ayta olmagan gaplarim shu qutilarda edi. Bugun hammasi ochildi.",
      },
    ],

    // ── Tilak qutisi (javob menga Telegramga keladi) ──────────
    wish: {
      script: "shivirlab ayting",
      title: "Tilak qutisi",
      subtitle: "Bugungi tilagingizni shu yerga yozing. U faqat menga keladi — va qo'limdan kelsa, ro'yobga chiqaraman.",
      placeholder: "Mening tilagim...",
      send: "Tilakni yuborish",
      sending: "Yuborilmoqda...",
      thanks: "Tilagingiz menga yetib keldi 💛",
      thanksNote: "Endi u ikkovimizning sirimiz. Men esa ustida ishlay boshladim.",
    },

    // ── Yuklab olinadigan tabrik kartasi ──────────────────────
    card: {
      script: "esdalik",
      title: "Tabrik kartangiz",
      subtitle: "Shu kunning kichkina esdaligi — yuklab oling va saqlab qo'ying.",
      button: "Kartani yuklab olish",
      saved: "Yuklab olindi 💛",
      alt: "Tabrik kartasi",
      greeting: "Tug'ilgan kuningiz muborak,",
      dateLine: "19 avgust 2026",
      // {n} — yoshi. `turning` bo'sh bo'lsa bu satr chizilmaydi.
      ageLine: "{n} yosh",
      quote: "Ko'zlaringiz kulsin, yuragingiz tinch bo'lsin —\nva bu yil sizga o'zingizga o'xshab mehribon bo'lsin.",
      signoff: "sizdan bir kun ham voz kechmagan biri",
    },

    // ── Telegram/WhatsApp havola ko'rinishi ───────────────────
    share: {
      title: "Tug'ilgan kuningiz muborak, Dilnura 🎂",
      description: "Bugun siz uchun bir narsa tayyorladim. Ochib ko'ring ♥",
      tagline: "Ochib ko'ring — bugun bu yer sizga tegishli",
    },

    // ── FINAL: keyingi bayramni birga nishonlaymizmi? ─────────
    finale: {
      lead: "Bugungi kunni faqat bitta narsa yanada chiroyliroq qila oladi...",
      question: "Bayramni birga nishonlaymizmi?",
      note: "Dilnura — bu yil sizga tort ham, sham ham ekran orqali yetib bordi. Keyingi safar esa ro'paringizda o'tirib tabriklashni istardim. Bir marta bo'lsa ham.",
      yes: "HA 🎂",
      notYet: "Yo'q",
      nudges: [
        "hmm... u uyaldi 😊",
        "bu tugma tanlanishni xohlamayapti...",
        "ko'rdingizmi? tugma ham javobni biladi...",
        "ushlay olmaysiz — u mening tarafimda 💛",
        "shunchaki ha deng... u abadiy qochaveradi 🙂",
      ],
      yesResponse: "Unda bu yil mening ham eng yaxshi yilim bo'ladi",
    },

    // ── Bayram rejasi (u HA deganidan keyin) ──────────────────
    party: {
      intro: "Endi bayramni birga chizamiz. Har bir tanlov — sizniki 🎂",
      steps: [
        {
          key: "place",
          title: "Qayerda nishonlaymiz?",
          subtitle: "Ayting — men o'sha yerni butun dunyodagi eng chiroyli joyga aylantiraman.",
          options: [
            "Kichkina, shinam kafe",
            "Sham yoritilgan restoran",
            "Ko'l bo'yida, suv sadosi ostida",
            "Yulduzlar tagida — park",
            "Uyda — tortni o'zim pishiraman",
          ],
        },
        {
          key: "when",
          title: "Qachon uchrashamiz?",
          subtitle: "Siz tanlagan kun — mening yilimning eng go'zal kuni bo'ladi.",
          options: [],
        },
        {
          key: "cake",
          title: "Qanaqa tort bo'lsin?",
          subtitle: "Shamlarni siz puflaysiz — men shunchaki qarab turaman.",
          options: [
            "Shokoladli — qalin va issiq",
            "Chizkeyk — yengil va nozik",
            "Medovik — bolali qatlamlar",
            "Mevali, yengil krem bilan",
            "Muzqaymoqli tort",
          ],
        },
        {
          key: "gift",
          title: "Sovg'a nima bo'lsin?",
          subtitle: "Ayting — qolganini men uddalayman.",
          options: [
            "Gullar — juda ko'p gullar",
            "Kitob — siz sevadigan",
            "Atir",
            "Kichkina, lekin ma'noli bir narsa",
            "Hech narsa — shunchaki vaqtingiz",
          ],
        },
        {
          key: "vibe",
          title: "Kayfiyat qanday bo'lsin?",
          subtitle: "Shovqinli bayrammi yoki ikkovimizga yetadigan sokinlikmi?",
          options: [
            "Sokin — faqat ikkovimiz",
            "Kichkina davra, yaqin odamlar",
            "Musiqa, kulgi, sharlar",
            "Kun botganda — oltin soatda",
            "Kechasi 🌙 — yulduzlar guvohligida",
          ],
        },
      ],
      doneTitle: "Bizning bayram rejamiz 🎂",
      doneSubtitle: "Mana, keyingi tug'ilgan kuningiz shunday bo'ladi. Endi buni haqiqatga aylantirish menga qoldi.",
      closing: "Kuningizni birga nishonlashga sanoqli kunlar qoldi, Dilnura 🎂",
      savedNote: "💾 Reja telefoningizga rasm bo'lib saqlandi",
      cardSubtitle: "Dilnuraning bayrami",
      cardClosing: "Shamlarni birga puflaymiz 🎂",
    },

    // ── U menga yozadigan javob qutisi ────────────────────────
    reply: {
      title: "Menga bir narsa yuborasizmi?",
      subtitle: "Yozing, rasm tashlang, video yoki ovozli xabar yuboring — o'zingiz tanlang 💛",
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
      sentNote: "Har bir so'zingiz, har bir lahzangiz men uchun qimmatli.",
    },
  },

  // Yashirin yuraklar — topib oladigan kichkina sirlar.
  secrets: [
    "Bir sir topdingiz! 19-avgust mening taqvimimdagi yagona qizil sana.",
    "Yana bir sir: bu saytdagi har bir jumlani yozishdan oldin, sizning kulganingizni tasavvur qilganman.",
    "Oxirgi sir: bu yil sizga aytadigan tilagimni allaqachon tilab bo'lganman — shamlar sizning oldingizda edi, lekin tilak meniki edi.",
  ],
};

export type PhotoItem = (typeof content.photos)[number];
export type TimelineItem = (typeof content.timeline.items)[number];
