import { rest } from "msw"
import { toEntity } from "./utils"

const api = "/api/transaction"

export const transactionHandlers = [
  rest.get(api, (_req, res, ctx) =>
    res(
      ctx.json([
        toEntity({
          date: "2020-10-23",
          category: "Leisure",
          value: 17.67,
          description: "Architects Ticket",
          type: "DEBIT",
          outgoing: true,
          quantity: 1,
          recipient: null,
          inbound: null,
          outbound: null,
          source: null
        }),
        toEntity({
          date: "2020-10-24",
          category: "Food",
          value: 5.85,
          description: "Pizza/Drink",
          type: "DEBIT",
          outgoing: true,
          quantity: 1,
          recipient: null,
          inbound: null,
          outbound: null,
          source: null
        }),
        toEntity({
          date: "2020-10-24",
          category: "Petrol",
          value: 32.26,
          description: "Petrol",
          type: "DEBIT",
          outgoing: true,
          quantity: 1,
          recipient: null,
          inbound: null,
          outbound: null,
          source: null
        })
      ])
    )
  ),
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
  )
]
