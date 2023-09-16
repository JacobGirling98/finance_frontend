import { rest } from "msw"
import { toEntity } from "./utils"
import { StandingOrder } from "../../types/StandingOrders"
import { Entity } from "../../types/Api"

const api = "http://localhost:9000/standing-orders"

export const standingOrdersHandlers = [
  rest.get<Entity<StandingOrder>>(api, (_req, res, ctx) =>
    res(
      ctx.json([
        toEntity({
          nextDate: "2023-09-01",
          frequencyQuantity: 1,
          frequencyUnit: "MONTHLY",
          category: "Spotify",
          value: 5,
          description: "Spotify",
          type: "BANK_TRANSFER",
          outgoing: true,
          quantity: 1,
          recipient: "Parents",
          inbound: null,
          outbound: null
        }),
        toEntity({
          nextDate: "2023-08-16",
          frequency: "MONTHLY",
          category: "Savings",
          value: 200,
          description: "Help to Buy ISA",
          type: "PERSONAL_TRANSFER",
          outgoing: false,
          quantity: 1,
          recipient: null,
          inbound: "Help to Buy ISA",
          outbound: "Current"
        })
      ])
    )
  ),
  rest.post(`${api}/debit`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/credit`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/bank-transfer`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/personal-transfer`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/income`, (_req, res, ctx) => res(ctx.status(204)))
]
