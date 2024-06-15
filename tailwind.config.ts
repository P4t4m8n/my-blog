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
        "screen-minus-sticky-mobile": "calc(100svh - 32rem)",
        "text-editor": "calc(100vh - 23rem)",
        "profile-minus": "calc(100vh - 18rem) ",
      },
      height: {
        "profile-minus": "calc(100vh - 18rem) ",
      },
      maxWidth: {
        editor: "calc(100vw - 2rem)",
        details: "calc(100svw - 5rem)",
      },
      maxHeight: {
        "screen-minus-sticky": "calc(100vh - 14rem)",
        "screen-minus-sticky-mobile": "calc(100svh - 32rem)",
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
      gridTemplateColumns: {
        "custom-lg": "13rem 1fr",
        "custom-md": "calc(100svw - 14rem)",
        "custom-sm": "calc(100svw - 4rem)",
        posts:
          "minmax(1rem,5%) minmax(6.5rem,20%) minmax(6.5rem,10%) minmax(5rem,15%) minmax(7rem,15%) minmax(5rem,15%) minmax(5rem,15%) minmax(5rem,15%) ",
      },
      gridTemplateRows: {
        "custom-lg": "auto auto 1fr auto auto auto",
        "custom-md": "auto auto auto auto 1fr auto auto auto",
      },
      boxShadow: {
        "full-screen": "0px 10px 3000px 1500px rgba(0, 0, 0, 0.5)",
      },
      screens: {
        details_breakpoint: {
          max: "930px",
        },
        mobile: {
          max: "650px",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".truncate-multiline": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          "text-overflow": "ellipsis",
          "-webkit-line-clamp": "3",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".grid-area-details-header-lg": {
          gridArea: "1 / 2 / 2 / -1",
        },
        ".grid-area-details-content-lg": {
          gridArea: "2 / 2 / 3 / -1",
        },
        ".grid-area-details-tags-lg": {
          gridArea: "3 / 2 / 4 / -1",
        },
        ".grid-area-details-comments-lg": {
          gridArea: "4 / 2 / 5 / -1",
        },
        ".grid-area-details-info-lg": {
          gridArea: "1 / 1 / -1 / 2",
        },
        ".grid-area-details-header-md": {
          gridArea: "1 / 1 / 2 / -1",
        },
        ".grid-area-details-info-md": {
          gridArea: "2 / 1 / 3 / -1",
        },
        ".grid-area-details-content-md": {
          gridArea: "3 / 1 / 4 / -1",
        },
        ".grid-area-details-tags-md": {
          gridArea: "4 / 1 / 5 / -1",
        },
        ".grid-area-details-comments-md": {
          gridArea: "5 / 1 / 6 / -1",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
  darkMode: "class",
};
export default config;
