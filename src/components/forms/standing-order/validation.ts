import { ValidationErrors } from "../../../types/NewMoney";
import { BankTransferStandingOrder, CreditDebitStandingOrder, Frequency, IncomeStandingOrder, PersonalTransferStandingOrder } from "../../../types/StandingOrders";
import { validateBankTransfer, validateCreditDebit, validateIncome, validatePersonalTransfer, validatePositiveInt } from "../new-transaction/validation";

const validateFrequency = (frequency: number): ValidationErrors<Frequency> => ({
  frequencyQuantity: validatePositiveInt("Frequency", frequency),
  frequencyUnit: ""
})

export const validateCreditDebitStandingOrder = (standingOrder: CreditDebitStandingOrder): ValidationErrors<CreditDebitStandingOrder> => ({
  ...validateCreditDebit(standingOrder),
  ...validateFrequency(standingOrder.frequencyQuantity)
})

export const validateBankTransferStandingOrder = (standingOrder: BankTransferStandingOrder): ValidationErrors<BankTransferStandingOrder> => ({
  ...validateBankTransfer(standingOrder),
  ...validateFrequency(standingOrder.frequencyQuantity)
})

export const validatePersonalTransferStandingOrder = (standingOrder: PersonalTransferStandingOrder): ValidationErrors<PersonalTransferStandingOrder> => ({
  ...validatePersonalTransfer(standingOrder),
  ...validateFrequency(standingOrder.frequencyQuantity)
})

export const validateIncomeStandingOrder = (standingOrder: IncomeStandingOrder): ValidationErrors<IncomeStandingOrder> => ({
  ...validateIncome(standingOrder),
  ...validateFrequency(standingOrder.frequencyQuantity)
})

