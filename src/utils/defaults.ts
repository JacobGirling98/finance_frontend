import {BankTransfer, CreditDebit, Income, PersonalTransfer} from "../types/NewMoney";

export const emptyCreditDebit = (): CreditDebit => ({
  ...({
    category: "", date: "", description: "", quantity: 0, value: 0
  })
})

export const emptyPersonalTransfer = (): PersonalTransfer => ({
  ...({
    category: "", date: "", description: "", inbound: "", outbound: "", value: 0
  })
})

export const emptyBankTransfer = (): BankTransfer => ({
  ...({
    category: "", date: "", description: "", quantity: 0, recipient: "", value: 0
  })
})

export const emptyIncome = (): Income => ({
  ...({
    category: "", date: "", description: "", source: "", value: 0
  })
})