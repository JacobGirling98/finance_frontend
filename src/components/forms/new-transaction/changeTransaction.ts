export const changeSingleTransaction = <T>(
  transaction: T,
  value: string | number,
  field: keyof T
): T => ({ ...transaction, [field]: typeof value === "number" && isNaN(value) ? 0 : value })
