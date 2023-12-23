import colors from "tailwindcss/colors"
import headlessuiTailwind from "@headlessui/tailwindcss"

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
            dark: colors.gray[50]
          },
          strong: {
            light: colors.gray[900],
            dark: colors.gray[200]
          }
        },
        input: {
          light: colors.white,
          dark: colors.stone[600]
        },
        transparent: {
          light: "#7a71de14",
          dark: "#8882ce14"
        },
        disabled: {
          light: colors.gray[400],
          dark: colors.gray[700]
        },
        special: {
          light: colors.blue[700],
          dark: colors.blue[600],
          text: {
            light: colors.slate[50],
            dark: colors.slate[100]
          },
          hover: {
            light: colors.blue[600],
            dark: colors.blue[500]
          },
          active: {
            light: colors.blue[500],
            dark: colors.blue[400]
          },
          disabled: {
            light: colors.blue[800],
            dark: colors.blue[700]
          }
        },
        error: {
          light: colors.red[600],
          dark: colors.red[500]
        }
      }
    }
  },
  plugins: [headlessuiTailwind],
  darkMode: "class"
}
