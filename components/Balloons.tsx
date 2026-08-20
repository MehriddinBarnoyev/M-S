"use client";

import { motion } from "framer-motion";

export type BalloonSpec = {
  left: string;
  delay: number;
  duration: number;
  hue: string;
  size: number;
};

/** The set that drifts up behind her name in the hero. */
export const SCREEN_BALLOONS: BalloonSpec[] = [
  { left: "8%", delay: 0, duration: 17, hue: "#e8b4b8", size: 46 },
  { left: "20%", delay: 4.5, duration: 21, hue: "#f3d9a4", size: 34 },
  { left: "76%", delay: 2, duration: 19, hue: "#f7c8d0", size: 40 },
  { left: "89%", delay: 7, duration: 23, hue: "#d4af6a", size: 30 },
  { left: "52%", delay: 10, duration: 25, hue: "#e8b4b8", size: 26 },
];

/** A tighter, faster set for the inside of a card or dialog. */
export const CARD_BALLOONS: BalloonSpec[] = [
  { left: "6%", delay: 0, duration: 6.5, hue: "#e8b4b8", size: 26 },
  { left: "24%", delay: 1.6, duration: 7.5, hue: "#f3d9a4", size: 18 },
  { left: "70%", delay: 0.7, duration: 7, hue: "#f7c8d0", size: 22 },
  { left: "88%", delay: 2.4, duration: 8, hue: "#d4af6a", size: 16 },
];

/**
 * Balloons rising through whatever box they are placed in. `travel` is how
 * far up they float and `start` where they begin — both plain CSS lengths,
 * so the same component works full-screen or inside a small card.
 */
export default function Balloons({
  items = SCREEN_BALLOONS,
  travel = "-125vh",
  start = "-18vh",
  opacity = 0.55,
}: {
  items?: BalloonSpec[];
  travel?: string;
  start?: string;
  opacity?: number;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.left, bottom: start }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, travel], opacity: [0, opacity, opacity, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.12, 0.85, 1],
          }}
        >
          <motion.div
            animate={{ x: [0, 14, -10, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="rounded-[50%] blur-[0.4px]"
              style={{
                width: b.size,
                height: b.size * 1.22,
                background: `radial-gradient(circle at 34% 28%, #fff8, ${b.hue} 46%, ${b.hue}bb 100%)`,
                boxShadow: `0 0 26px ${b.hue}55`,
              }}
            />
            <div
              className="mx-auto h-10 w-px"
              style={{
                background: "linear-gradient(to bottom, rgba(253,246,238,0.45), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
