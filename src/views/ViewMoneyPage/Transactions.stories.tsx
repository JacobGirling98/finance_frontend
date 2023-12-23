import { Meta, StoryObj } from "@storybook/react"
import Transactions from "./Transactions"

import { getTransactionsHandler } from "../../mocks/handlers/transactions"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const meta: Meta<typeof Transactions> = {
  component: Transactions
}

// eslint-disable-next-line react-refresh/only-export-components
export default meta

type Story = StoryObj<typeof Transactions>

export const Primary: Story = {
  render: () => <Transactions />,
  decorators: [
    (story) => (
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
    )
  ],
  parameters: {
    msw: {
      handlers: [getTransactionsHandler]
    }
  }
}
