export const THEME = {

  background: "#14110f",

  panel: "#1f1b18",

  panel2: "#2a241f",

  text: {

    primary: "#fffaf5",

    secondary: "#d6c3b1",

    muted: "#9f8d7d",
  },

  border: {

    soft:
      "rgba(255,245,235,0.08)",

    strong:
      "rgba(255,245,235,0.16)",
  },

  glow: {

    amber:
      "rgba(245,158,11,0.18)",

    orange:
      "rgba(249,115,22,0.18)",

    coral:
      "rgba(251,146,60,0.18)",

    emerald:
      "rgba(16,185,129,0.18)",

    rose:
      "rgba(244,114,182,0.18)",
  },

  colors: {

    amber: {
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
    },

    orange: {
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
    },

    coral: {
      300: "#fdc4a6",
      400: "#fb8b5b",
      500: "#f97352",
    },

    emerald: {
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
    },

    rose: {
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
    },

    cream: {
      300: "#fff7ed",
      400: "#ffedd5",
      500: "#fed7aa",
    },

    brown: {
      300: "#c6a58b",
      400: "#a67c52",
      500: "#7c5a3b",
    },
  },

  shadows: {

    panel:
      "0 10px 35px rgba(0,0,0,0.35)",

    amber:
      "0 0 30px rgba(245,158,11,0.16)",

    orange:
      "0 0 30px rgba(249,115,22,0.16)",

    coral:
      "0 0 30px rgba(251,146,60,0.16)",
  },

  gradients: {

    amberToOrange:
      "linear-gradient(90deg, #f59e0b, #f97316)",

    orangeToRose:
      "linear-gradient(90deg, #f97316, #ec4899)",

    amberGlow:
      "linear-gradient(135deg, rgba(245,158,11,0.22), transparent)",

    orangeGlow:
      "linear-gradient(135deg, rgba(249,115,22,0.22), transparent)",
  },
};

export const LAYER_ACCENTS = {

  7: "#ec4899",

  6: "#fb923c",

  5: "#10b981",

  4: "#f59e0b",

  3: "#f97316",

  2: "#a67c52",

  1: "#fbbf24",
};

export function getLayerAccent(
  layer: number
) {

  return (
    LAYER_ACCENTS[
      layer as keyof typeof LAYER_ACCENTS
    ] ?? "#f59e0b"
  );
}