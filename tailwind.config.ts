import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#050510",
        midnight: "#0b1026",
        "midnight-2": "#131b3a",
        rosegold: "#e8b4b8",
        "rosegold-deep": "#c98a90",
        champagne: "#f3d9a4",
        "champagne-deep": "#d4af6a",
        blush: "#f7c8d0",
        pearl: "#fdf6ee",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        letter: ["var(--font-letter)", "cursive"],
      },
      animation: {
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 3.2s ease-in-out infinite",
        floaty: "floaty 7s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
