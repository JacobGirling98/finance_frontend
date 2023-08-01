import { CreditDebit, ValidationErrors } from "../../../../types/NewMoney"

export const emptyCreditDebit = (date: string, category: string): CreditDebit => ({
  ...{
    category,
    date,
    description: "",
    quantity: 0,
    value: 0,
  },
})

export const emptyCreditDebitErrors = (): ValidationErrors<CreditDebit> => ({
  ...{
    category: "",
    date: "",
    description: "",
    quantity: "",
    value: "",
  },
})