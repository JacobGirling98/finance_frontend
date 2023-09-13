import { ValidationErrors } from "../../../../types/NewMoney"
import { PersonalTransferStandingOrder } from "../../../../types/StandingOrders"
import { emptyPersonalTransfer, emptyPersonalTransferErrors } from "../../new-transaction/personal-transfer/defaults"

export const emptyPersonalTransferStandingOrder = (date: string, category: string): PersonalTransferStandingOrder => ({
  ...emptyPersonalTransfer(date, category),
  frequencyUnit: "Monthly",
  frequencyQuantity: 1
})

export const emptyPersonalTransferStandingOrderErrors = (): ValidationErrors<PersonalTransferStandingOrder> => ({
  ...emptyPersonalTransferErrors(),
  frequencyUnit: "",
  frequencyQuantity: ""
})