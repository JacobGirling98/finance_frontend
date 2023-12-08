import type { Preview } from "@storybook/react"
import '../src/index.css'
import { withThemeByClassName } from "@storybook/addon-themes";
import { initialize, mswLoader } from "msw-storybook-addon"
import { QueryClient } from "react-query";

initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  loaders: [mswLoader]
}

export default preview

export const decorators = [withThemeByClassName({
  themes: {
      // nameOfTheme: 'classNameForTheme',
      light: '',
      dark: 'dark',
  },
  defaultTheme: 'light',
})]
