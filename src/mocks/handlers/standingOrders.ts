import { rest } from "msw"
import { toEntity } from "./utils"

const api = "http://localhost:9000/standing-orders"

export const standingOrdersHandlers = [
  rest.get(api, (_req, res, ctx) =>
    res(
      ctx.json([
        toEntity({
          nextDate: "2023-09-01",
          frequency: "MONTHLY",
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
  rest.post(api, (_req, res, ctx) => res(ctx.status(204)))
]
