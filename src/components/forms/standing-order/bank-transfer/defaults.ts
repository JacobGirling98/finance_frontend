import { ValidationErrors } from "../../../../types/NewMoney"
import { BankTransferStandingOrder } from "../../../../types/StandingOrders"
import { today } from "../../../../utils/constants"
import { emptyBankTransfer, emptyBankTransferErrors } from "../../new-transaction/bank-transfer/defaults"

export const emptyBankTransferStandingOrder = (): BankTransferStandingOrder => ({
  ...emptyBankTransfer(today, ""),
  frequencyUnit: "Months",
  frequencyQuantity: 1
})

export const emptyBankTransferStandingOrderErrors = (): ValidationErrors<BankTransferStandingOrder> => ({
  ...emptyBankTransferErrors(),
  frequencyUnit: "",
  frequencyQuantity: ""
})