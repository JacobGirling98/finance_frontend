import { expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"
import { setupServer } from "msw/node"

expect.extend(matchers)

export const server = setupServer()

beforeAll(() => server.listen())

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => server.close())
