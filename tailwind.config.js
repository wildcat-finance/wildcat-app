/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        "3xl": "756px",
        "1xl": "570px",
        "2xl": "460px",
      },
      fontSize: {
        xxs: ".65rem",
      },
      colors: {
        lavender: "#CAD5F4",
        "border-black": "#000000",
        black: "#232323",
        glacier: {
          DEFAULT: "#78bfc9",
          50: "#f1f9fa",
          100: "#dcf0f1",
          200: "#bce1e5",
          300: "#78bfc9",
          400: "#59aab7",
          500: "#3d8e9d",
          600: "#367484",
          700: "#31606d",
          800: "#2f515b",
          900: "#2b454e",
          950: "#182c34",
        },
        blue: {
          DEFAULT: '#3b82f6',
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        cian: "#BDD6ED",
        gray: "#DDE2DC",
        green: "#7DA58A",
        brown: "#854C31",
        "white-brown": "#857844",
        gold: "#857844",
        red: "#932D2D",
        "red-border": "#CF292380",
        "red-error": "#CF2923",
        sand: "#FFFEF2",
        orange: "#F3A436",
        tint: {
          1: "#393938",
          2: "#4F4F4C",
          3: "#656561",
          4: "#7B7B76",
          5: "#91918B",
          6: "#A7A69F",
          7: "#BDBCB4",
          7.5: "#D3D2C94D",
          8: "#D3D2C9",
          8.5: "#ECE8DF80",
          9: "#E9E8DD",
          10: "#F4F3E8",
          11: "#F3E9E0",
        },
        silver: {
          100: "#F0F7FA",
          200: "#F1F7F9",
        },
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
      });
    }),
  ],
};
