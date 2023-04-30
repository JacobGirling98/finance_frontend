import ViewMoneyPage from "./ViewMoneyPage";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "View Money Page",
  component: ViewMoneyPage,
} as Meta<typeof ViewMoneyPage>;

const Template: StoryFn<typeof ViewMoneyPage> = () => (
  <QueryClientProvider client={new QueryClient()}>
    <ViewMoneyPage />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(`${BASE_URL}/reference/fiscal-months`, (_req, res, ctx) => {
        return res(
          ctx.json([
            {
              startDate: "2020-02-15",
              endDate: "2020-03-15",
            },
            {
              startDate: "2020-01-15",
              endDate: "2020-02-15",
            },
          ])
        );
      }),
      rest.get(`${BASE_URL}/view/headlines`, (_req, res, ctx) => {
        return res(
          ctx.json([
            {
              income: 3000,
              spending: 1000,
              savings: 500,
              net: 2000,
            },
          ])
        );
      }),
    ],
  },
};
