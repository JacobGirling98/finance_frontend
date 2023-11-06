import { rest } from "msw"

const api = "/api/backup"

export const backupHandlers = [
  rest.post(`${api}/push`, (_req, res, ctx) => res(ctx.status(204))),
  rest.post(`${api}/pull`, (_req, res, ctx) => res(ctx.status(204)))
]