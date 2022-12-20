const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: {
            main: colors.indigo[700],
            hover: colors.indigo[600],
            active: colors.indigo[500],
            ring: colors.indigo[800],
            disabled: colors.gray[700]
          }
        },
        secondary: {
          dark: {
            main: colors.gray[100]
          }
        },
        background: {
          dark: {
            main: colors.gray[900]
          }
        },
        bg: {
          light: "#ffffff",
          dark: "#202020"
        },
        text: {
          light: "#273040",
          dark: "#dddfe4"
        },
        'text-soft': {
          light: "#444a56",
          dark: "#b9bbc1"
        },
        'text-strong': {
          light: "#4a4a4a",
          dark: "#bbbbbb"
        },
        subtle: {
          light: "#f8f9fd",
          dark: "#222429"
        },
        border: {
          light: "#e0e7f6",
          dark: "#2a313d"
        },
        shadow: {
          light: "#b0c0dd",
          dark: "#000000"
        },
        input: {
          light: "#ffffff",
          dark: "#1c1c1c"
        },
        outline: {
          light: "#bebbe5",
          dark: "#9c98d7"
        },
        mark: {
          light: "#7a71de14",
          dark: "#8882ce14"
        },
        special: {
          light: "#7a71de",
          dark: "#8882ce"
        },
        "special-bg": {
          light: "#7e76df",
          dark: "#5e56b6"
        },
        "special-text": {
          light: "#ffffff",
          dark: "#dfdfe4"
        },
        "special-shadow": {
          light: "#585773",
          dark: "#1e1d29"
        },
        "special-mark": {
          light: "#ffffff14",
          dark: "#dfdfe414"
        },
        light: {
          light: "#f3f3fc",
          dark: "#d3d1ed"
        },
        dark: {
          light: "#45426c",
          dark: "#343347"
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
