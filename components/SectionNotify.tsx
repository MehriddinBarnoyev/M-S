"use client";

import { useEffect, useRef } from "react";
import { notify } from "@/lib/telegram";

/**
 * Wraps a section and pings Telegram the first time it scrolls into view,
 * so you can follow along as Sevinch moves through the surprise.
 */
export default function SectionNotify({
  message,
  threshold = 0.35,
  children,
}: {
  message: string;
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
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [message, threshold]);

  return <div ref={ref}>{children}</div>;
}
