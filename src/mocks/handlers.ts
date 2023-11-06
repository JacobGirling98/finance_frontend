import { rest } from "msw"
import { referenceHandlers } from "./handlers/reference"
import { standingOrdersHandlers } from "./handlers/standingOrders"
import { transactionHandlers } from "./handlers/transactions"
import { headlinesHandlers } from "./handlers/headlines"
import { backupHandlers } from "./handlers/backup"

const api = "/api"

export const handlers = [
  ...referenceHandlers,
  ...standingOrdersHandlers,
  ...transactionHandlers,
  ...headlinesHandlers,
  ...backupHandlers,
  rest.get(`${api}/last-login`, (_req, res, ctx) => {
    return res(ctx.body("2023-08-01"))
  }),
  rest.get(`${api}/last-transaction`, (_req, res, ctx) => {
    return res(ctx.body("2023-07-31"))
  })
]
