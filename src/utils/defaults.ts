import {BankTransfer, CreditDebit, Income, PersonalTransfer, ValidationErrors} from "../types/NewMoney";

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

export const emptyCreditDebitErrors = (): ValidationErrors<CreditDebit> => ({
  ...({
    category: "", date: "", description: "", quantity: "", value: ""
  })
})

export const emptyPersonalTransferErrors = (): ValidationErrors<PersonalTransfer> => ({
  ...({
    category: "", date: "", description: "", inbound: "", outbound: "", value: ""
  })
})

export const emptyBankTransferErrors = (): ValidationErrors<BankTransfer> => ({
  ...({
    category: "", date: "", description: "", quantity: "0", recipient: "", value: "0"
  })
})

export const emptyIncomeErrors = (): ValidationErrors<Income> => ({
  ...({
    category: "", date: "", description: "", source: "", value: ""
  })
})