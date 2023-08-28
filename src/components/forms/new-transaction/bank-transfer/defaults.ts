import { BankTransfer, ValidationErrors } from "../../../../types/NewMoney";

export const emptyBankTransfer = (date: string, category: string): BankTransfer => ({
  ...{
    category,
    date,
    description: "",
    quantity: 0,
    recipient: "",
    value: 0,
  }
})

export const emptyBankTransferErrors = (): ValidationErrors<BankTransfer> => ({
  ...{
    category: "",
    date: "",
    description: "",
    quantity: "",
    recipient: "",
    value: "",
  }
})