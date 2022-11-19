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
            ring: colors.indigo[800]
          }
        },
        secondary: {
          dark: {
            main: colors.white
          }
        },
        text: {
          primary: {
            dark: {
              main: colors.gray[500],
              hover: colors.gray[400],
              active: colors.gray[300]
            }
          }
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
