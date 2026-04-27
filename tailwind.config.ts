import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef0f9",
          100: "#daddf2",
          200: "#bcc1e5",
          300: "#9ba3d8",
          400: "#7a85cb",
          500: "#5867be",
          600: "#252e78", // Base Primary
          700: "#1e2560",
          800: "#161c48",
          900: "#0f1330",
          950: "#070918",
        },
        cta: {
          50: "#eaf2f8",
          100: "#d3e4f1",
          200: "#a7c9e4",
          300: "#7badd7",
          400: "#4e91ca",
          500: "#286aa6", // Base CTA
          600: "#205585",
          700: "#184064",
          800: "#102a43",
          900: "#081521",
          950: "#040a11",
        },
        secondary: {
          50: "#eff4f8",
          100: "#dee9f1",
          200: "#bdd3e2",
          300: "#9cbed4",
          400: "#7aa8c6",
          500: "#5992b8",
          600: "#4161a0", // Secondary/Hover
          700: "#344d7f",
          800: "#27385f",
          900: "#1a243e",
          950: "#0d121f",
        },
        section: {
          DEFAULT: "#ABCAE0",
          50: "#f5f9fc",
          100: "#ebf2f8",
          200: "#cde2f0",
          300: "#abcae0", // Base Background
          400: "#89b2d0",
          500: "#6799c0",
          600: "#4581b0",
        }
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
