import { ValidationErrors } from "../../../../types/NewMoney";
import { CreditDebitStandingOrder } from "../../../../types/StandingOrders";
import { today } from "../../../../utils/constants";
import { emptyCreditDebit, emptyCreditDebitErrors } from "../../new-transaction/credit-debit/defaults";

export const emptyCreditDebitStandingOrder = (): CreditDebitStandingOrder => ({
  ...emptyCreditDebit(today, ""),
  frequencyUnit: "Months",
  frequencyQuantity: 1
})

export const emptyCreditDebitStandingOrderErrors = (): ValidationErrors<CreditDebitStandingOrder> => ({
  ...emptyCreditDebitErrors(),
  frequencyUnit: "",
  frequencyQuantity: ""
})