export type LayerDesignToken = {

  soft: string;

  accent: string;

  accentHover: string;

  chart: string;
};

export const LAYER_DESIGN: Record<
  number,
  LayerDesignToken
> = {

  7: {
    soft: "#3b1d2e",
    accent: "#ec4899",
    accentHover: "#db2777",
    chart: "#ec4899",
  },

  6: {
    soft: "#3a2617",
    accent: "#fb923c",
    accentHover: "#f97316",
    chart: "#fb923c",
  },

  5: {
    soft: "#16352a",
    accent: "#10b981",
    accentHover: "#059669",
    chart: "#10b981",
  },

  4: {
    soft: "#3b2f12",
    accent: "#f59e0b",
    accentHover: "#d97706",
    chart: "#f59e0b",
  },

  3: {
    soft: "#40221a",
    accent: "#f97316",
    accentHover: "#ea580c",
    chart: "#f97316",
  },

  2: {
    soft: "#3b3127",
    accent: "#a67c52",
    accentHover: "#8b5e34",
    chart: "#a67c52",
  },

  1: {
    soft: "#3d3212",
    accent: "#fbbf24",
    accentHover: "#f59e0b",
    chart: "#fbbf24",
  },
};

export function getLayerDesign(
  layerNum: number
): LayerDesignToken {

  return (
    LAYER_DESIGN[layerNum] ??
    LAYER_DESIGN[4]
  );
}

export const LAYER_GRADIENT =
  "linear-gradient(90deg, #ec4899 0%, #fb923c 16%, #10b981 33%, #f59e0b 50%, #f97316 66%, #a67c52 83%, #fbbf24 100%)";