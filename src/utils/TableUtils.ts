export const formatFrequency = (frequencyUnit: string, frequencyQuantity: number): string => {
  if (frequencyQuantity > 1) {
    return `${frequencyQuantity} ${frequencyUnit === "MONTHLY" ? "Months" : "Weeks"}`
  } else {
    return `${frequencyQuantity} ${frequencyUnit === "MONTHLY" ? "Month" : "Week"}`
  }
}

export const handleUndefined = (data?: string): string => (
  !data ? "-" : data
)

export const formatTransactionType = (type: string): string => {
  switch (type) {
    case "DEBIT": return "Debit"
    case "CREDIT": return "Credit"
    case "BANK_TRANSFER": return "Bank Transfer"
    case "PERSONAL_TRANSFER": return "Personal Transfer"
    case "INCOME": return "Income"
    default: return ""
  }
}