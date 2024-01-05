import { rest } from "msw"
import { Reminder, ReminderId } from "../../types/Reminder"
import { server } from "../../../test/setup"
import { renderWithQueryClient } from "../../../test/render"
import Reminders from "./Reminders"
import { screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { toEntity } from "../../mocks/handlers/utils"
import { Entity } from "../../types/Api"
import userEvent from "@testing-library/user-event"

const standingOrderId = "1c78eb6b-1192-47b1-b6ee-61185f116d5b"

const standingOrderReminder: Entity<Reminder> = {
  id: standingOrderId,
  domain: {
    date: "2023-01-01",
    frequency: "MONTHLY",
    frequencyQuantity: 1,
    description: "Check standing orders"
  }
}

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

it("clicking the tick with a single reminder advances the reminder and removes the snackbar", async () => {
  const user = userEvent.setup()
  const postHandler = rest.post<ReminderId>(
    "/api/reminders/advance",
    async (req, res, ctx) => {
      const reminderId = await req.json()

      expect(reminderId.id).toBe(standingOrderId)

      return res(ctx.status(204))
    }
  )
  server.use(singleReminderHandler, postHandler)

  renderWithQueryClient(<Reminders />)

  await waitFor(async () => {
    expect(screen.getByText(/Check standing orders/i)).toBeInTheDocument()
  })

  user.click(screen.getByTestId("tick"))

  await waitFor(async () => {
    expect(screen.queryByText(/Check standing orders/i)).not.toBeInTheDocument()
  })
})

it("clicking the tick with many reminders advances the reminder and goes to the next one", async () => {
  const user = userEvent.setup()
  const postHandler = rest.post<ReminderId>(
    "/api/reminders/advance",
    async (_req, res, ctx) => res(ctx.status(204))
  )
  server.use(multipleRemindersHandler, postHandler)

  renderWithQueryClient(<Reminders />)

  await waitFor(async () => {
    expect(screen.getByText(/Check standing orders/i)).toBeInTheDocument()
  })

  user.click(screen.getByTestId("tick"))

  await waitFor(async () => {
    expect(screen.queryByText(/Check standing orders/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Check other stuff/i)).toBeInTheDocument()
  })
})
