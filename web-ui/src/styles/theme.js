/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const breakpoints = ["8em", "30em", "45em", "64em", "80em", "86em", "100em"];

const [xs, sm, md, xm, lg, ml, xl] = breakpoints;
breakpoints.xs = xs;
breakpoints.sm = sm;
breakpoints.md = md;
breakpoints.xm = xm;
breakpoints.lg = lg;
breakpoints.ml = ml;
breakpoints.xl = xl;

const space = [
  0,
  0.2,
  0.4,
  0.6,
  0.8,
  1,
  1.1,
  1.2,
  1.3,
  1.4,
  1.5,
  1.6,
  1.7,
  1.8,
  1.9,
  2,
  2.1,
  2.2,
  2.4,
  2.6,
  2.8,
  3,
  3.2,
  3.4,
  3.6,
  3.8,
  4,
  5,
  6,
  7,
  8,
].map((s) => `${s}rem`);

// #endregion
// #region typography
export const fontSets = [
  {
    name: "heading",
    fontSize: "2.8rem",
    lineHeight: "2.8rem",
    fontWeight: "normal",
  },
  {
    name: "title",
    fontSize: "1.8rem",
    lineHeight: "1.8rem",
    fontWeight: "normal",
  },
  {
    name: "field",
    fontSize: "1.6rem",
    lineHeight: "2rem",
    fontWeight: "normal",
  },
  {
    name: "body",
    fontSize: "1.4rem",
    lineHeight: "1.4rem",
    fontWeight: "normal",
  },
  {
    name: "small",
    alias: "displaySm",
    fontSize: "1.2rem",
    lineHeight: "1.2rem",
    fontWeight: "normal",
  },

  {
    name: "headingBold",
    fontSize: "2.8rem",
    lineHeight: "2.8rem",
    fontWeight: "bold",
  },
  {
    name: "titleBold",
    fontSize: "1.8rem",
    lineHeight: "1.8rem",
    fontWeight: "bold",
  },
  {
    name: "heading3",
    fontSize: "2.2rem",
    lineHeight: "2.2rem",
    fontWeight: "bold",
  },
  {
    name: "bigBody",
    fontSize: "1.6rem",
    lineHeight: "1.6rem",
    fontWeight: "normal",
  },
  {
    name: "bigBodyBold",
    fontSize: "1.6rem",
    lineHeight: "1.6rem",
    fontWeight: "bold",
  },
  {
    name: "bodyBold",
    fontSize: "1.4rem",
    lineHeight: "1.4rem",
    fontWeight: "bold",
  },
  {
    name: "smallBold",
    fontSize: "1.2rem",
    lineHeight: "1.2rem",
    fontWeight: "bold",
  },
];
const fontMaps = fontSets.reduce(
  (fontMap, { name, alias = name, fontSize, lineHeight, fontWeight }, index) => {
    const fm = fontMap;
    fm.fontSizes[index] = fontSize;
    fm.fontSizes[name] = fontSize;
    fm.fontSizes[alias] = fontSize;
    fm.fontWeights[index] = fontWeight;
    fm.fontWeights[name] = fontWeight;
    fm.fontWeights[alias] = fontWeight;
    fm.lineHeights[name] = lineHeight;
    fm.lineHeights[alias] = lineHeight;
    return fm;
  },
  {
    fontFamily: {
      primary: "Poppins",
      bold: "Poppins-Bold",
      light: "Poppins-Light",
      extraLight: "Poppins-ExtraLight",
      medium: "Poppins-Medium",
      semibold: "Poppins-SemiBold",
    },
    fontSizes: {},
    fontWeights: {
      medium: 500,
    },
    lineHeights: {},
  }
);
// #endregion
// #region colors
const colorSets = [
  {
    name: "primary",
    colors: [
      { name: 50, hex: "#eed7d1" },
      { name: 100, hex: "#ddaea4" },
      { name: 200, hex: "#cd8676" },
      { name: 300, hex: "#c4725f" },
      { name: 400, hex: "#b34932" },
      { name: 500, hex: "#ab351b" },
      { name: 600, hex: "#9a3018" },
      { name: 700, hex: "#892a16" },
      { name: 800, hex: "#672010" },
      { name: 900, hex: "#561b0e" },
    ],
  },
  {
    name: "blue",
    alias: "info",
    colors: [
      { name: 500, hex: "#006CFB" },
      { name: 900, hex: "#021355" },
    ],
  },
  {
    name: "gray",
    colors: [
      { name: 50, hex: "#fafafa" },
      { name: 100, hex: "#e5e5e5" },
      { name: 200, hex: "#eeeeee" },
      { name: 300, hex: "#e0e0e0" },
      { name: 400, hex: "#c4c4c4" },
      { name: 500, hex: "#9e9e9e" },
      { name: 600, hex: "#717171" },
      { name: 700, hex: "#616161" },
      { name: 800, hex: "#424242" },
      { name: 900, hex: "#222222" },
    ],
  },
  {
    name: "red",
    alias: "danger",
    colors: [
      { name: 50, hex: "#ffebee" },
      { name: 100, hex: "#ffcdd2" },
      { name: 200, hex: "#ef9a9a" },
      { name: 300, hex: "#e57373" },
      { name: 400, hex: "#ef5350" },
      { name: 500, hex: "#f44336" },
      { name: 600, hex: "#e53935" },
      { name: 700, hex: "#d32f2f" },
      { name: 800, hex: "#c62828" },
      { name: 900, hex: "#b71c1c" },
    ],
  },

  {
    name: "green",
    alias: "success",
    colors: [{ name: 500, hex: "#00A65E" }],
  },
  {
    name: "bluegray",
    colors: [
      { name: 50, hex: "#eceff1" },
      { name: 100, hex: "#cfd8dc" },
      { name: 200, hex: "#b0bec5" },
      { name: 300, hex: "#90a4ae" },
      { name: 400, hex: "#78909c" },
      { name: 500, hex: "#607d8b" },
      { name: 600, hex: "#546e7a" },
      { name: 700, hex: "#46535B" },
      { name: 800, hex: "#37474f" },
      { name: 900, hex: "#263238" },
    ],
  },
  {
    name: "lightgrey",
    colors: [
      { name: 300, hex: "#F2F2F2" },
      { name: 400, hex: "#F4F4F4" },
      { name: 500, hex: "#F4F4F4" },

      { name: 800, hex: "#F8F8F8" },
      { name: 900, hex: "#F9F9F9" },
    ],
  },
  {
    name: "darkgrey",
    colors: [
      { name: 500, hex: "#6E6E6E" },
      { name: 900, hex: "#111111" },
    ],
  },
  {
    name: "bordergrey",
    colors: [{ name: 500, hex: "#EBEBEB" }],
  },
  {
    name: "yellow",
    colors: [
      { name: 500, hex: "#F2994A" },
      { name: 600, hex: "#F2CB00" },
    ],
  },
  {
    name: "red",
    colors: [{ name: 500, hex: "  #E73D3D" }],
  },
];
const colors = colorSets.reduce(
  (colorMap, { name, alias = name, colors: colorSet }) => {
    const color = {};
    const cm = colorMap;
    for (let colorIndex = 0; colorIndex < colorSet.length; colorIndex++) {
      const { name: colorName, hex } = colorSet[colorIndex];
      color[colorIndex] = hex;
      color[colorName] = hex;
    }
    cm[name] = color;
    cm[alias] = color;
    return cm;
  },
  {
    // ...defaultTheme.colors,
    white: "#FFFFFF",
    "white.0": "#FFFFFF",
    black: "#000000",
    "black.0": "#000000",
  }
);

// #endregion
const radii = {
  // ...defaultTheme.radii,
  small: "0.125rem",
  normal: "0.1875rem",
  large: "0.375rem",
  full: "10rem",
  square: 0,
};
const zIndices = {
  // ...defaultTheme.zIndices,
  modal: 2000,
  tooltip: 5000,
  toast: 7000,
};

const shadows = [
  { name: "none", shadow: undefined },
  { name: "sm", shadow: "0 .075rem .15rem rgba(0,0,0,.15)" },
  { name: "xl", shadow: "0 0 1rem rgba(0,0,0,.15)" },
].reduce(
  (shadowSet, { name, shadow }, index) => {
    const s = shadowSet;
    s[name] = shadow;
    s[index] = shadow;
    return s;
  }
  // { ...defaultTheme.shadows },
);

export const theme = {
  // ...defaultTheme,
  breakpoints,
  radii,
  colors,
  space,
  zIndices,
  shadows,
  ...fontMaps,
};
