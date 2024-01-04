import { expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Reminder from "./Reminder"

it("renders the text correctly", () => {
  const reminderText = "This is a reminder!"
  render(<Reminder text={reminderText} onSuccess={vi.fn()} onCross={vi.fn()} />)

  expect(screen.getByText(reminderText)).toBeInTheDocument()
})

it("calls onSuccess when the tick button is clicked", async () => {
  const onSuccessMock = vi.fn()
  render(
    <Reminder text="Reminder" onSuccess={onSuccessMock} onCross={vi.fn()} />
  )

  const tickButton = screen.getByTestId("tick")
  await userEvent.click(tickButton)

  expect(onSuccessMock).toHaveBeenCalledTimes(1)
})

it("calls onCross when the cross button is clicked", async () => {
  const onCrossMock = vi.fn()
  render(<Reminder text="Reminder" onSuccess={vi.fn()} onCross={onCrossMock} />)

  const crossButton = screen.getByTestId("cross")
  await userEvent.click(crossButton)

  expect(onCrossMock).toHaveBeenCalledTimes(1)
})
