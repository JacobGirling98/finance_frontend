import * as colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          light: colors.gray[800],
          dark: colors.gray[100],
          soft: {
            light: colors.gray[700],
            dark: colors.gray[50],
          },
          strong: {
            light: colors.gray[900],
            dark: colors.gray[200],
          },
        },
        input: {
          light: colors.white,
          dark: colors.gray[600],
        },
        transparent: {
          light: "#7a71de14",
          dark: "#8882ce14",
        },
        disabled: {
          light: colors.gray[400],
          dark: colors.gray[700],
        },
        special: {
          light: colors.indigo[500],
          dark: colors.indigo[600],
          text: {
            light: colors.slate[50],
            dark: colors.slate[100],
          },
          shadow: {
            light: colors.indigo[900],
            dark: colors.slate[900],
          },
          hover: {
            light: colors.indigo[400],
            dark: colors.indigo[500],
          },
          active: {
            light: colors.indigo[300],
            dark: colors.indigo[400],
          },
          disabled: {
            light: colors.indigo[600],
            dark: colors.indigo[700],
          },
        },
        error: {
          light: colors.red[600],
          dark: colors.red[500],
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
