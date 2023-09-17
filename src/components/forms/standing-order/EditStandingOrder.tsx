import { FC } from "react"
import { Entity } from "../../../types/Api"
import { StandingOrder } from "../../../types/StandingOrders"
import BankTransferForm from "./bank-transfer/BankTransferForm"
import CreditDebitForm from "./credit-debit/CreditDebitForm"
import IncomeForm from "./income/IncomeForm"
import PersonalTransferForm from "./personal-transfer/PersonalTransferForm"
import TransactionTypeSelect from "../../inputs/select/TransactionTypeSelect"
import { toTransactionType } from "../../../utils/transactionType"
import {
  toBankTransferStandingOrder,
  toCreditDebitStandingOrder,
  toIncomeStandingOrder,
  toPersonalTransferStandingOrder
} from "../../../types/marshalling/standing-order"

interface EditStandingOrderProps {
  standingOrder: Entity<StandingOrder>
  closeDialog: () => void
}

const EditStandingOrder: FC<EditStandingOrderProps> = ({
  standingOrder,
  closeDialog
}) => {
  const body = () => {
    switch (standingOrder.domain.type) {
      case "DEBIT":
        return (
          <CreditDebitForm
            transactionType="debit"
            closeDialog={closeDialog}
            initialState={toCreditDebitStandingOrder(standingOrder)}
          />
        )
      case "CREDIT":
        return (
          <CreditDebitForm
            transactionType="credit"
            closeDialog={closeDialog}
            initialState={toCreditDebitStandingOrder(standingOrder)}
          />
        )
      case "BANK_TRANSFER":
        return (
          <BankTransferForm
            closeDialog={closeDialog}
            initialState={toBankTransferStandingOrder(standingOrder)}
          />
        )
      case "PERSONAL_TRANSFER":
        return (
          <PersonalTransferForm
            closeDialog={closeDialog}
            initialState={toPersonalTransferStandingOrder(standingOrder)}
          />
        )
      case "INCOME":
        return (
          <IncomeForm
            closeDialog={closeDialog}
            initialState={toIncomeStandingOrder(standingOrder)}
          />
        )
      default:
        return (
          <CreditDebitForm transactionType="credit" closeDialog={closeDialog} />
        )
    }
  }

  return (
    <div className="pt-2">
      <div className="flex flex-col mx-2">
        <label className="text-text-light dark:text-text-dark mb-1 ml-2">
          Transaction Type
        </label>
        <TransactionTypeSelect
          value={toTransactionType(standingOrder.domain.type)}
          disabled={true}
        />
      </div>
      {body()}
    </div>
  )
}

export default EditStandingOrder
