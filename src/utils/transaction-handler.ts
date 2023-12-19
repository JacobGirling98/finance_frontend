/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidationErrors } from "../types/NewMoney"

export const hasValidationError = <T>(error: ValidationErrors<T>): boolean =>
  Object.entries(error)
    .map(([_, value]) => value !== "")
    .includes(true)

export const containsValidationError = <T>(
  errors: ValidationErrors<T>[]
): boolean =>
  errors.flatMap((error) => hasValidationError(error)).includes(true)

export const changeSingleTransaction = <T>(
  transaction: T,
  value: string | number,
  field: keyof T
): T => ({
  ...transaction,
  [field]: typeof value === "number" && isNaN(value) ? 0 : value
})
