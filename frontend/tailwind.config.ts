import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        forestGreen: {
          light: "#4A6B32",
          DEFAULT: "#365024",
          dark: "#253818",
        },
        spiritualGreen: {
          light: "#4A6B32",
          DEFAULT: "#365024",
          dark: "#253818",
        },
        bordeaux: {
          light: "#821B1C",
          DEFAULT: "#651011",
          dark: "#450A0B",
        },
        // Secondary
        bronze: {
          DEFAULT: "#9A5C19",
          dark: "#7A4711",
        },
        softGold: {
          DEFAULT: "#C9A35A",
          dark: "#A6823C",
        },
        gold: {
          DEFAULT: "#C9A35A",
          dark: "#A6823C",
        },
        // Neutral
        sage: {
          light: "#92A282",
          DEFAULT: "#768667",
          dark: "#5A674E",
        },
        ivory: {
          50: "#FFFFFF",
          DEFAULT: "#FDFBF6",
          dark: "#F4EFE3",
        },
        cream: {
          50: "#FDFBF6",
          100: "#FDFBF6",
          200: "#F4EFE3",
          300: "#E8DEC8",
        },
        beige: {
          DEFAULT: "#F4EFE3",
          dark: "#E8DEC8",
        },
        darkGray: "#1E221B",
        lightGray: "#F4EFE3",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "islamic-pattern": "radial-gradient(circle, rgba(101, 16, 17, 0.05) 1px, transparent 1px)",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-bordeaux": "pulseBordeaux 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseBordeaux: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
