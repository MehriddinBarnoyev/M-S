"use client";

import Lenis from "lenis";
import { useCallback, useEffect, useState } from "react";
import { content } from "@/lib/content";
import { music } from "@/lib/music";
import IntroOverlay from "@/components/IntroOverlay";
import NightSky from "@/components/NightSky";
import CursorFX from "@/components/CursorFX";
import MusicButton from "@/components/MusicButton";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import PhotoStory from "@/components/PhotoStory";
import Timeline from "@/components/Timeline";
import Messages from "@/components/Messages";
import Constellation from "@/components/Constellation";
import VoiceMessage from "@/components/VoiceMessage";
import LoveLetter from "@/components/LoveLetter";
import BirthdayFinale from "@/components/BirthdayFinale";
import HiddenHearts from "@/components/HiddenHearts";
import SectionNotify from "@/components/SectionNotify";
import BirthdayIntro from "@/components/BirthdayIntro";
import BirthdaySection from "@/components/BirthdaySection";
import { isBirthdayMode } from "@/lib/birthday";
import { notify } from "@/lib/telegram";

export default function Experience() {
  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [skyBoost, setSkyBoost] = useState(false);
  // The site is a birthday site, so this is on unless `?nobday` turns it
  // off. It's decided on the client, before the intro ever paints.
  const [birthday, setBirthday] = useState(true);

  useEffect(() => {
    setBirthday(isBirthdayMode());
  }, []);

  // ?skip in the URL bypasses the intro (handy while personalizing)
  useEffect(() => {
    if (window.location.search.includes("skip")) {
      setShowIntro(false);
      setStarted(true);
    }
  }, []);

  // Let you know the moment she opens the surprise (fires once).
  useEffect(() => {
    notify("🎂 <b>Dilnura</b> tug'ilgan kun saytini ochdi.");
  }, []);

  // Buttery smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Lock scroll until she presses Begin
  useEffect(() => {
    document.body.style.overflow = started ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [started]);

  const begin = useCallback(() => {
    setStarted(true);
    music.start();
  }, []);

  const onFinaleInView = useCallback((inView: boolean) => {
    setSkyBoost(inView);
  }, []);

  return (
    <main className="relative">
      <NightSky boost={skyBoost} />
      <CursorFX />
      {showIntro &&
        (birthday ? (
          <BirthdayIntro onBegin={begin} />
        ) : (
          <IntroOverlay onBegin={begin} />
        ))}
      <MusicButton visible={started} />
      {started && <HiddenHearts />}

      <div className="relative z-10">
        <Hero started={started} />

        <SectionNotify message="🎉 <b>Dilnura</b> — tug'ilgan kun bo'limiga yetdi (sovg'alar, tilak, karta).">
          <BirthdaySection />
        </SectionNotify>

        <SectionNotify message="⏳ <b>Dilnura</b> — keyingi tug'ilgan kun sanog'ini ko'rdi.">
          <section className="relative px-6 py-20 sm:py-28">
            <Countdown />
          </section>
        </SectionNotify>

        <SectionNotify message="🎬 <b>Dilnura</b> — tabrik so'zlarini o'qiy boshladi.">
          <Messages />
        </SectionNotify>

        <SectionNotify message="📸 <b>Dilnura</b> — rasmlar bo'limiga yetdi.">
          <PhotoStory />
        </SectionNotify>

        <SectionNotify message="📖 <b>Dilnura</b> — o'z hikoyasini (timeline) ko'rmoqda.">
          <Timeline />
        </SectionNotify>

        <SectionNotify message="✨ <b>Dilnura</b> — yulduzlar bo'limiga yetdi.">
          <Constellation />
        </SectionNotify>

        <SectionNotify message="🎙 <b>Dilnura</b> — ovozli tabrikni ochdi.">
          <VoiceMessage />
        </SectionNotify>

        <SectionNotify message="💌 <b>Dilnura</b> — TUG'ILGAN KUN XATINI ochdi.">
          <LoveLetter />
        </SectionNotify>

        <SectionNotify message="🎂 <b>Dilnura</b> — final bo'limiga yetdi (bayramni birga nishonlaymizmi?).">
          <BirthdayFinale onEnter={onFinaleInView} />
        </SectionNotify>

        <footer className="relative z-10 pb-14 pt-6 text-center">
          <p className="font-script text-2xl text-rosegold/70">
            butun qalbim bilan — {content.herName} uchun, 19 avgust
          </p>
        </footer>
      </div>
    </main>
  );
}
