import { rest } from "msw"
import { referenceHandlers } from "./handlers/reference"

const api = "http://localhost:9000"

export const handlers = [
  ...referenceHandlers,
  rest.get(`${api}/last-login`, (_req, res, ctx) => {
    return res(ctx.body("2023-08-01"))
  }),
]
