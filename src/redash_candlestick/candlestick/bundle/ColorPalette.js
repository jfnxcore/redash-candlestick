import ColorPalette from "@redash/viz/lib/visualizations/ColorPalette";

const EXTENDED_COLORS = {
  White: "#ffffff",
  Black: "#000000",
  Red: "#ff0000",
  "Light Gray": "#dddddd",
}

export default {
  ...ColorPalette,
  ...EXTENDED_COLORS
};
