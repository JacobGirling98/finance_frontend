import { Meta, StoryObj } from "@storybook/react"
import Transactions from "./Transactions"
import { rest } from "msw"
import * as page1 from "../../../test/transaction-responses/page-1.json"
import * as page2 from "../../../test/transaction-responses/page-2.json"
import { QueryClient, QueryClientProvider } from "react-query"

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
      handlers: [
        rest.get("/api/transaction", (req, res, ctx) => {
          const pageNumber = req.url.searchParams.get("pageNumber")
          console.log(pageNumber)
          if (pageNumber === "1") {
            return res(ctx.json(page1))
          } else {
            return res(ctx.json(page2))
          }
        })
      ]
    }
  }
}
