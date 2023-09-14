import { ValidationErrors } from "../../../../types/NewMoney"
import { BankTransferStandingOrder } from "../../../../types/StandingOrders"
import { emptyBankTransfer, emptyBankTransferErrors } from "../../new-transaction/bank-transfer/defaults"

export const emptyBankTransferStandingOrder = (date: string, category: string): BankTransferStandingOrder => ({
  ...emptyBankTransfer(date, category),
  frequencyUnit: "Months",
  frequencyQuantity: 1
})

export const emptyBankTransferStandingOrderErrors = (): ValidationErrors<BankTransferStandingOrder> => ({
  ...emptyBankTransferErrors(),
  frequencyUnit: "",
  frequencyQuantity: ""
})