import { ValidationErrors } from "../../../types/NewMoney";
import { CreditDebitStandingOrder } from "../../../types/StandingOrders";
import { validateCreditDebit } from "../new-transaction/validation";

export const validateCreditDebitStandingOrder = (standingOrder: CreditDebitStandingOrder): ValidationErrors<CreditDebitStandingOrder> => ({
  ...validateCreditDebit(standingOrder),
  frequency: ""
})