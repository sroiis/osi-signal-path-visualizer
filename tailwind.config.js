/** @type {import('tailwindcss').Config} */

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        /* CORE */

        background: "#070b14",

        panel: "#0f172a",

        panel2: "#111827",

        borderSoft:
          "rgba(255,255,255,0.08)",

        /* TEXT */

        textPrimary: "#ffffff",

        textSecondary: "#94a3b8",

        /* SIGNALPATH COLORS */

        cyan: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
        },

        violet: {
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
        },

        orange: {
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
        },

        green: {
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
        },

        yellow: {
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
        },

        pink: {
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
        },

        blue: {
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
        },
      },

      fontFamily: {

        sans: [
          "Inter",
          "system-ui",
          "sans-serif",
        ],

        mono: [
          "JetBrains Mono",
          "Fira Code",
          "monospace",
        ],
      },

      boxShadow: {

        panel:
          "0 10px 35px rgba(0,0,0,0.30)",

        glowCyan:
          "0 0 25px rgba(34,211,238,0.16)",

        glowViolet:
          "0 0 25px rgba(139,92,246,0.16)",

        glowOrange:
          "0 0 25px rgba(249,115,22,0.16)",
      },

      backdropBlur: {
        xs: "2px",
      },

      screens: {
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },

      animation: {

        pulseSlow:
          "pulse 3s ease-in-out infinite",

        float:
          "float 5s ease-in-out infinite",

        glow:
          "glow 2s ease-in-out infinite",
      },

      keyframes: {

        float: {

          "0%, 100%": {
            transform:
              "translateY(0px)",
          },

          "50%": {
            transform:
              "translateY(-6px)",
          },
        },

        glow: {

          "0%, 100%": {
            opacity: "0.6",
          },

          "50%": {
            opacity: "1",
          },
        },
      },
    },
  },

  plugins: [],
};