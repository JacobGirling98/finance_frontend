import { rest } from "msw"
import { referenceHandlers } from "./handlers/reference"
import { standingOrdersHandlers } from "./handlers/standingOrders"
import { transactionHandlers } from "./handlers/transactions"
import { headlinesHandlers } from "./handlers/headlines"

const api = "http://localhost:9000"

export const handlers = [
  ...referenceHandlers,
  ...standingOrdersHandlers,
  ...transactionHandlers,
  ...headlinesHandlers,
  rest.get(`${api}/last-login`, (_req, res, ctx) => {
    return res(ctx.body("2023-08-01"))
  }),
  rest.get(`${api}/last-transaction`, (_req, res, ctx) => {
    return res(ctx.body("2023-07-31"))
  })
]
