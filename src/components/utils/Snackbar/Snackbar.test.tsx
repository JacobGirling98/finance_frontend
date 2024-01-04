import { render, screen } from "@testing-library/react"
import { it } from "vitest"
import Snackbar from "./Snackbar"

it("renders if isOpen is true", () => {
  const child = <p>Text</p>
  render(<Snackbar isOpen={true}>{child}</Snackbar>)

  const childNode = screen.getByText("Text")

  expect(childNode).toBeInTheDocument()
})

it("does not render if isOpen is false", async () => {
  const child = <p>Text</p>
  render(<Snackbar isOpen={false}>{child}</Snackbar>)

  const childNode = screen.queryByText("Text")

  expect(childNode).toBeNull()
})
