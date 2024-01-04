import { rest } from "msw"
import { Reminder } from "../../types/Reminder"
import { server } from "../../../test/setup"
import { renderWithQueryClient } from "../../../test/render"
import Reminders from "./Reminders"
import { screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { toEntity } from "../../mocks/handlers/utils"
import { Entity } from "../../types/Api"

const standingOrderReminder: Entity<Reminder> = toEntity({
  date: "2023-01-01",
  frequency: "MONTHLY",
  frequencyQuantity: 1,
  description: "Check standing orders"
})

const otherReminder: Entity<Reminder> = toEntity({
  date: "2023-01-01",
  frequency: "MONTHLY",
  frequencyQuantity: 1,
  description: "Check other stuff"
})

const noReminderHandler = rest.get("/api/reminders", (_req, res, _ctx) => {
  return res()
})

const singleReminderHandler = rest.get("api/reminders", (_req, res, ctx) => {
  return res(ctx.json([standingOrderReminder]))
})

const multipleRemindersHandler = rest.get("api/reminders", (_req, res, ctx) => {
  return res(ctx.json([standingOrderReminder, otherReminder]))
})

it("won't render snackbar if no reminders are returned", async () => {
  server.use(noReminderHandler)

  renderWithQueryClient(<Reminders />)

  await waitFor(() => {
    expect(screen.queryByRole("div")).not.toBeInTheDocument()
  })
})

it("will render first response if a multiple reminders are returned", async () => {
  server.use(multipleRemindersHandler)

  renderWithQueryClient(<Reminders />)

  await waitFor(() => {
    expect(screen.getByText(/Check standing orders/i)).toBeInTheDocument()
  })
})
