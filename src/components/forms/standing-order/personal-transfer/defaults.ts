import { ValidationErrors } from "../../../../types/NewMoney"
import { PersonalTransferStandingOrder } from "../../../../types/StandingOrders"
import { today } from "../../../../utils/constants"
import { emptyPersonalTransfer, emptyPersonalTransferErrors } from "../../new-transaction/personal-transfer/defaults"

export const emptyPersonalTransferStandingOrder = (): PersonalTransferStandingOrder => ({
  ...emptyPersonalTransfer(today, ""),
  frequencyUnit: "Months",
  frequencyQuantity: 1
})

export const emptyPersonalTransferStandingOrderErrors = (): ValidationErrors<PersonalTransferStandingOrder> => ({
  ...emptyPersonalTransferErrors(),
  frequencyUnit: "",
  frequencyQuantity: ""
})