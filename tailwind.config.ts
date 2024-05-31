import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      minHeight: { "screen-minus-sticky": "calc(100vh - 12rem)" },
      maxHeight: { "screen-minus-sticky": "calc(100vh - 16rem)" },
      colors: {
        customDark: "#222831",
        customGray: "#393E46",
        customTeal: "#00ADB5",
        customLight: "#EEEEEE",
        customCardBgYellow: "#F9ED69",
        customCardBgOrange: "F08A5D",
        customCardBgMaroon: "B83B5E",
        customCardBgPurple: "6A2C70",
      },
      fontFamily: {
        bitter: ["var(--font-bitter)"],
        workSans: ["var(--font-work-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
