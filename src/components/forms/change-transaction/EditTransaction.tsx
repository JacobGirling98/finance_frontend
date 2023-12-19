import { Entity } from "../../../types/Api"
import { Transaction } from "../../../types/ViewMoney"
import {
  toBankTransfer,
  toCreditDebit,
  toIncome,
  toPersonalTransfer
} from "../../../types/marshalling/transaction"
import { toTransactionType } from "../../../utils/transactionType"
import TransactionTypeSelect from "../../inputs/select/TransactionTypeSelect"
import BankTransferForm from "./bank-transfer/BankTransferForm"
import CreditDebitForm from "./credit-debit/CreditDebitForm"
import IncomeForm from "./income/IncomeForm"
import PersonalTransferForm from "./personal-transfer/PersonalTransferForm"

interface EditTransactionProps {
  transaction: Entity<Transaction>
  closeDialog: () => void
}

const EditTransaction = ({
  transaction,
  closeDialog
}: EditTransactionProps) => {
  const body = () => {
    switch (transaction.domain.type) {
      case "DEBIT":
        return (
          <CreditDebitForm
            transactionType="debit"
            closeDialog={closeDialog}
            initialState={toCreditDebit(transaction)}
          />
        )
      case "CREDIT":
        return (
          <CreditDebitForm
            transactionType="credit"
            closeDialog={closeDialog}
            initialState={toCreditDebit(transaction)}
          />
        )
      case "BANK_TRANSFER":
        return (
          <BankTransferForm
            closeDialog={closeDialog}
            initialState={toBankTransfer(transaction)}
          />
        )
      case "PERSONAL_TRANSFER":
        return (
          <PersonalTransferForm
            closeDialog={closeDialog}
            initialState={toPersonalTransfer(transaction)}
          />
        )
      case "INCOME":
        return (
          <IncomeForm
            closeDialog={closeDialog}
            initialState={toIncome(transaction)}
          />
        )
      default:
        return (
          <CreditDebitForm
            initialState={toCreditDebit(transaction)}
            transactionType="credit"
            closeDialog={closeDialog}
          />
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
          value={toTransactionType(transaction.domain.type)}
          disabled={true}
        />
      </div>
      {body()}
    </div>
  )
}

export default EditTransaction
