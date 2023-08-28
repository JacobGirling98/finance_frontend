import { ValidationErrors } from "../../../../types/NewMoney";
import { CreditDebitStandingOrder } from "../../../../types/StandingOrders";
import { emptyCreditDebit, emptyCreditDebitErrors } from "../../new-transaction/credit-debit/defaults";

export const emptyCreditDebitStandingOrder = (date: string, category: string): CreditDebitStandingOrder => ({
  ...emptyCreditDebit(date, category),
  frequency: "monthly"
})

export const emptyCreditDebitStandingOrderErrors = (): ValidationErrors<CreditDebitStandingOrder> => ({
  ...emptyCreditDebitErrors(),
  frequency: ""
})