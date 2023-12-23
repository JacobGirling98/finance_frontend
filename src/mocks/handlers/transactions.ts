import { rest } from "msw"
import * as page1 from "../../../test/transaction-responses/page-1.json"
import * as page2 from "../../../test/transaction-responses/page-2.json"

const api = "/api/transaction"

export const getTransactionsHandler = rest.get(
  "/api/transaction",
  (req, res, ctx) => {
    const pageNumber = req.url.searchParams.get("pageNumber")
    console.log(pageNumber)
    if (pageNumber === "1") {
      return res(ctx.json(page1))
    } else {
      return res(ctx.json(page2))
    }
  }
)

export const transactionHandlers = [
  rest.post(`${api}/bank-transfer`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/personal-transfer`, (_req, res, ctx) =>
    res(ctx.status(204))
  ),
  rest.post(`${api}/credit`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/debit`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/income`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/multiple/bank-transfer`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ transactionCount: 5, value: 5.0 }]))
  ),
  rest.post(`${api}/multiple/personal-transfer`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ transactionCount: 5, value: 5.0 }]))
  ),
  rest.post(`${api}/multiple/credit`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ transactionCount: 5, value: 5.0 }]))
  ),
  rest.post(`${api}/multiple/debit`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ transactionCount: 5, value: 5.0 }]))
  ),
  rest.post(`${api}/multiple/income`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ transactionCount: 5, value: 5.0 }]))
  ),
  getTransactionsHandler
]
