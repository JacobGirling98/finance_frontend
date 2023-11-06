import { rest } from "msw"

const api = "/api/headlines"

export const headlinesHandlers = [
  rest.get(api, (_req, res, ctx) =>
    res(
      ctx.json({
        income: 3052.06,
        spending: 4804.16,
        savings: 400,
        net: -1752.1
      })
    )
  )
]
