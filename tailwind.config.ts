import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      safelist: [
        "grid-cols-1",
        "grid-cols-2",
        "grid-cols-3",
        "grid-cols-4",
        "grid-cols-5",
        "grid-cols-6",
        "grid-cols-7",
        "grid-cols-8",
        "grid-cols-9",
        "grid-cols-10",
        "grid-cols-11",
        "grid-cols-12",
      ],
      margin: {
        detailsHeaderLeft: "calc(20% + 1rem)",
      },
      
      minHeight: {
        "screen-minus-sticky": "calc(100svh - 12rem)",
        "screen-minus-sticky-mobile": "calc(100svh - 14rem)",
        "text-editor": "calc(100vh - 23rem)",
        "profile-minus": "calc(100vh - 18rem) ",
      },
      height: {
        "profile-minus": "calc(100vh - 18rem) ",
      },
      maxWidth: {
        editor: "calc(100vw - 2rem)",
      },
      maxHeight: {
        "screen-minus-sticky": "calc(100vh - 14rem)",
        "profile-minus": "calc(100vh - 18rem) ",
      },
      colors: {
        light: {
          background: "#7CC5E2",
          text: "#7CC5E2",
        },
        dark: {
          background: "#163A61",
          text: "#F3F4F4",
        },
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

      screens: {
        mobile: {
          max: "640px",
        },
      },
    },
  },
  plugins: [function ({ addUtilities }: any) {
    const newUtilities = {
      '.truncate-multiline': {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': '3', 
      },
      
    };
    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
  darkMode: "class",
};
export default config;
