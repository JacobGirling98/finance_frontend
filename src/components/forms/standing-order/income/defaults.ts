import { ValidationErrors } from "../../../../types/NewMoney";
import { IncomeStandingOrder } from "../../../../types/StandingOrders";
import { emptyIncome, emptyIncomeErrors } from "../../new-transaction/income/defaults";

export const emptyIncomeStandingOrder = (date: string, category: string): IncomeStandingOrder => ({
  ...emptyIncome(date, category),
  frequencyUnit: "Months",
  frequencyQuantity: 1
})

export const emptyIncomeStandingOrderErrors = (): ValidationErrors<IncomeStandingOrder> => ({
  ...emptyIncomeErrors(),
  frequencyUnit: "",
  frequencyQuantity: ""
})