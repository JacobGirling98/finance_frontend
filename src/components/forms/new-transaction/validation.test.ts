import { isInt } from "./validation"

test("ints are detected", () => {
  const int = 2
  expect(isInt(int)).toBe(true)
})

test("non-ints are detected", () => {
  const float = 1.5
  expect(isInt(float)).toBe(false)
})