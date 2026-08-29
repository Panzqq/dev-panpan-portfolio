import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
      },
      colors: {
        brutal: {
          bg: "#0c0d14",
          surface: "#141622",
          card: "#191c2c",
          border: "#2d324d",
          cyan: "#00F0FF",
          lime: "#A3E635",
          pink: "#FF2A85",
          yellow: "#FFE600",
          purple: "#A855F7",
          orange: "#FF6B00",
        },
      },
      boxShadow: {
        "brutal-sm": "2px 2px 0px 0px #000000",
        "brutal": "4px 4px 0px 0px #000000",
        "brutal-lg": "6px 6px 0px 0px #000000",
        "brutal-xl": "8px 8px 0px 0px #000000",
        "brutal-cyan": "4px 4px 0px 0px #00F0FF",
        "brutal-lime": "4px 4px 0px 0px #A3E635",
        "brutal-pink": "4px 4px 0px 0px #FF2A85",
        "brutal-yellow": "4px 4px 0px 0px #FFE600",
        "brutal-purple": "4px 4px 0px 0px #A855F7",
      },
      animation: {
        "marquee": "marquee 20s linear infinite",
        "marquee-reverse": "marquee-reverse 20s linear infinite",
        "blink": "blink 1s step-start infinite",
        "scanline": "scanline 8s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch": "glitch 1s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
