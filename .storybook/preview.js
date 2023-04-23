import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import {initialize, mswDecorator} from "msw-storybook-addon";

initialize()

export const decorators = [mswDecorator];

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  darkMode: true,
};