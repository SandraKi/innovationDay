import type { Config } from "tailwindcss"
import { createDynamicFontStyle } from "./lib/typography"

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
      "4xl": "1920px",
    },
    colors: {
      primary1: {
        DEFAULT: "#1A1A1A",
        inverse: "#FFFFFF",
      },
      primary2: {
        DEFAULT: "#1A1A1A",
        inverse: "#FFFFFF",
      },
      primary3: {
        DEFAULT: "#1A1A1A",
        inverse: "#FFFFFF",
      },
      secondary1: {
        DEFAULT: "#FF0000",
        inverse: "#FFFFFF",
      },
      secondary2: {
        DEFAULT: "#FF0000",
        inverse: "#FFFFFF",
      },
      secondary3: {
        DEFAULT: "#FF0000",
        inverse: "#FFFFFF",
      },
      tertiary1: {
        DEFAULT: "yellow",
        inverse: "#000000",
      },
      tertiary2: {
        DEFAULT: "yellow",
        inverse: "#000000",
      },
      tertiary3: {
        DEFAULT: "yellow",
        inverse: "#000000",
      },
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
    },
    fontFamily: {
      primary: ["var(--font-primary)"],
      secondary: ["var(--font-secondary)"],
    },
    extend: {
      fontSize: {
        h1: createDynamicFontStyle({
          minFontSize: 40,
          maxFontSize: 80,
          minPercentage: 3,
          maxPercentage: 5,
          minLineHeight: 80,
          maxLineHeight: 160,
          maxPageWidth: 1920,
          fontWeight: 300,
        }),
        h2: createDynamicFontStyle({
          minFontSize: 28,
          maxFontSize: 56,
          minPercentage: 3,
          maxPercentage: 5,
          minLineHeight: 32,
          maxLineHeight: 64,
          maxPageWidth: 1920,
          fontWeight: 300,
        }),
        h3: "",
        h4: "",
        h5: "",
        h6: "",
        p1: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        p2: "",
        p3: "",
        p4: "",
        button: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        o1: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        o2: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        o3: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        deco1: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        deco2: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        deco3: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
        quote: [
          "",
          {
            letterSpacing: "",
            lineHeight: "",
            fontWeight: "",
          },
        ],
      },
      animation: {
        "fade-in-up": "textFadeInUp 1.2s ease-out",
      },
    },
  },
  plugins: [],
}
export default config
