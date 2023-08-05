import { rest } from "msw"
import { toEntity } from "./utils"

const api = "http://localhost:9000/reference"

export const referenceHandlers = [
  rest.get(`${api}/accounts`, (_req, res, ctx) =>
    res(ctx.json([toEntity("Current"), toEntity("Help to Buy")]))
  ),
  rest.get(`${api}/categories`, (_req, res, ctx) =>
    res(ctx.json([toEntity("Food"), toEntity("Tech"), toEntity("Leisure")]))
  ),
  rest.get(`${api}/fiscal-months`, (_req, res, ctx) =>
    res(
      ctx.json([
        {
          startDate: "2023-04-14",
          endDate: "2023-05-15",
        },
        {
          startDate: "2023-05-15",
          endDate: "2023-06-15",
        },
        {
          startDate: "2023-06-15",
          endDate: "2023-07-14",
        },
        {
          startDate: "2023-07-14",
          endDate: "2023-08-15",
        },
      ])
    )
  ),
  rest.get(`${api}/fiscal-years`, (_req, res, ctx) =>
    res(
      ctx.json([
        {
          startDate: "2020-04-15",
          endDate: "2021-04-15",
        },
        {
          startDate: "2021-04-15",
          endDate: "2022-04-14",
        },
        {
          startDate: "2022-04-14",
          endDate: "2023-04-14",
        },
        {
          startDate: "2023-04-14",
          endDate: "2024-04-15",
        },
      ])
    )
  ),
  rest.get(`${api}/months`, (_req, res, ctx) =>
    res(
      ctx.json([
        {
          startDate: "2023-05-01",
          endDate: "2023-06-01",
        },
        {
          startDate: "2023-06-01",
          endDate: "2023-07-01",
        },
        {
          startDate: "2023-07-01",
          endDate: "2023-08-01",
        },
        {
          startDate: "2023-08-01",
          endDate: "2023-09-01",
        },
      ])
    )
  ),
  rest.get(`${api}/payees`, (_req, res, ctx) =>
    res(ctx.json([toEntity("Parents"), toEntity("Adam"), toEntity("Allan")]))
  ),
  rest.get(`${api}/sources`, (_req, res, ctx) =>
    res(ctx.json([toEntity("Work"), toEntity("Parents")]))
  ),
  rest.get(`${api}/years`, (_req, res, ctx) =>
    res(
      ctx.json([
        {
          startDate: "2020-01-01",
          endDate: "2021-01-01",
        },
        {
          startDate: "2021-01-01",
          endDate: "2022-01-01",
        },
        {
          startDate: "2022-01-01",
          endDate: "2023-01-01",
        },
        {
          startDate: "2023-01-01",
          endDate: "2024-01-01",
        },
      ])
    )
  ),
  rest.get(`${api}/descriptions`, (_req, res, ctx) =>
    res(
      ctx.json([
        toEntity({
          fullDescription: "Heinz Classic Cream of Tomato Soup",
          shortDescription: "Soup",
        }),
        toEntity({
          fullDescription: "Cadbury dairy milk caramel",
          shortDescription: "Caramel",
        }),
      ])
    )
  ),
  rest.post(`${api}/descriptions`, (_req, res) => res()),
]
