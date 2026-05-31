import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          bg:      "#0e0b0a",
          panel:   "#16110f",
          panel2:  "#1e1714",
          border:  "#2c2320",
          dim:     "#6f635c",
          soft:    "#a99e95",
          text:    "#d7ccc2",
          accent:  "#9c4a33",
          warn:    "#c5503a",
          spirit:  "#9aac4e",
        },
      },
      fontFamily: {
        serif:   ['"Noto Serif KR"', "serif"],
        display: ['"Nanum Myeongjo"', "serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        ink: "2px",
      },
      letterSpacing: {
        label: "0.2em",
      },
      maxWidth: {
        narrative: "60ch",
      },
      keyframes: {
        breathe: {
          "0%,100%": { opacity: "0.45" },
          "50%":     { opacity: "1" },
        },
        blink: {
          "0%":   { opacity: "0.2" },
          "50%":  { opacity: "1" },
          "100%": { opacity: "0.2" },
        },
      },
      animation: {
        breathe:       "breathe 2.6s ease-in-out infinite",
        "breathe-fast": "breathe 1.8s ease-in-out infinite",
        blink:         "blink 1.2s steps(3) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
