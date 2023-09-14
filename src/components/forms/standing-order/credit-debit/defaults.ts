import { ValidationErrors } from "../../../../types/NewMoney";
import { CreditDebitStandingOrder } from "../../../../types/StandingOrders";
import { emptyCreditDebit, emptyCreditDebitErrors } from "../../new-transaction/credit-debit/defaults";

export const emptyCreditDebitStandingOrder = (date: string, category: string): CreditDebitStandingOrder => ({
  ...emptyCreditDebit(date, category),
  frequencyUnit: "Months",
  frequencyQuantity: 1
})

export const emptyCreditDebitStandingOrderErrors = (): ValidationErrors<CreditDebitStandingOrder> => ({
  ...emptyCreditDebitErrors(),
  frequencyUnit: "",
  frequencyQuantity: ""
})