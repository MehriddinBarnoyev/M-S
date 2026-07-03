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
import Proposal from "@/components/Proposal";
import HiddenHearts from "@/components/HiddenHearts";

export default function Experience() {
  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [skyBoost, setSkyBoost] = useState(false);

  // ?skip in the URL bypasses the intro (handy while personalizing)
  useEffect(() => {
    if (window.location.search.includes("skip")) {
      setShowIntro(false);
      setStarted(true);
    }
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

  const onProposalInView = useCallback((inView: boolean) => {
    setSkyBoost(inView);
  }, []);

  return (
    <main className="relative">
      <NightSky boost={skyBoost} />
      <CursorFX />
      {showIntro && <IntroOverlay onBegin={begin} />}
      <MusicButton visible={started} />
      {started && <HiddenHearts />}

      <div className="relative z-10">
        <Hero started={started} />

        <section className="relative px-6 py-20 sm:py-28">
          <Countdown />
        </section>

        <Messages />
        <PhotoStory />
        <Timeline />
        <Constellation />
        <VoiceMessage />
        <LoveLetter />
        <Proposal onEnter={onProposalInView} />

        <footer className="relative z-10 pb-14 pt-6 text-center">
          <p className="font-script text-2xl text-rosegold/70">
            made with all my heart, for {content.herName}
          </p>
        </footer>
      </div>
    </main>
  );
}
