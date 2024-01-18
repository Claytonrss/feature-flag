export const defaultTheme = {
  colors: {
    background: "#FFFFFF",
    text: "#222222",
    primary: "#EB2D2C",
  },
};

export const darkTheme = {
  colors: {
    ...defaultTheme.colors,
    background: "#222222",
    text: "#FFFFFF",
  },
};

export type ThemeType = typeof defaultTheme;
