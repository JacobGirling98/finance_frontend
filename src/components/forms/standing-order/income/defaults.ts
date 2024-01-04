import { ValidationErrors } from "../../../../types/NewMoney"
import { IncomeStandingOrder } from "../../../../types/StandingOrders"
import { today } from "../../../../utils/constants"
import {
  emptyIncome,
  emptyIncomeErrors
} from "../../new-transaction/income/defaults"

export const emptyIncomeStandingOrder = (): IncomeStandingOrder => ({
  ...emptyIncome(today, ""),
  frequency: "Months",
  frequencyQuantity: 1
})

export const emptyIncomeStandingOrderErrors =
  (): ValidationErrors<IncomeStandingOrder> => ({
    ...emptyIncomeErrors(),
    frequency: "",
    frequencyQuantity: ""
  })
