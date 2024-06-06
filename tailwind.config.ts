import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      margin: {
        detailsHeaderLeft: "calc(20% + 1rem)",
      },
      minHeight: { "screen-minus-sticky": "calc(100vh - 14rem)" },
      maxHeight: { "screen-minus-sticky": "calc(100vh - 14rem)" },
      colors: {
        customDark: "#222831",
        customGray: "#393E46",
        customHighlight: "#42f5d4",
        customTeal: "#00ADB5",
        customLight: "#EEEEEE",
        customCardBgYellow: "#F9ED69",
        customCardBgOrange: "#F08A5D",
        customCardBgMaroon: "#B83B5E",
        customCardBgPurple: "#6A2C70",
      },
      fontFamily: {
        bitter: ["var(--font-bitter)"],
        workSans: ["var(--font-work-sans)"],
      },
      keyframes: {
        "bg-slide": {
          "0%": { backgroundColor: "#222831", backgroundPosition: "0% 0" },
          "100%": { backgroundColor: "#393E46", backgroundPosition: "100% 0" },
        },
        "text-color-slide": {
          "0%": { color: "#EEEEEE" },
          "100%": { color: "#42f5d4" },
        },
      },
      animation: {
        "bg-slide": "bg-slide 0.5s ease-in-out forwards",
        "text-color-slide": "text-color-slide 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
