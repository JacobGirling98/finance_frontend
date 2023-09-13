import TransactionTypeSelect from "../../inputs/select/TransactionTypeSelect"
import useTransactionType from "../../../hooks/useTransactionType"
import CreditDebitForm from "./credit-debit/CreditDebitForm"
import { TransactionType } from "../../../types/NewMoney"
import BankTransferForm from "./bank-transfer/BankTransferForm"
import PersonalTransferForm from "./personal-transfer/PersonalTransferForm"
import IncomeForm from "./income/IncomeForm"

interface AddStandingOrderProps {
  closeDialog: () => void
}

const AddStandingOrder: React.FC<AddStandingOrderProps> = ({ closeDialog }) => {
  const { transactionType, setTransactionType } = useTransactionType()

  const body = () => {
    switch (transactionType) {
      case TransactionType.CREDIT:
        return (
          <CreditDebitForm transactionType="credit" closeDialog={closeDialog} />
        )
      case TransactionType.DEBIT:
        return (
          <CreditDebitForm transactionType="debit" closeDialog={closeDialog} />
        )
      case TransactionType.BANK_TRANSFER:
        return <BankTransferForm closeDialog={closeDialog} />
      case TransactionType.PERSONAL_TRANSFER:
        return <PersonalTransferForm closeDialog={closeDialog} />
      case TransactionType.INCOME:
        return <IncomeForm closeDialog={closeDialog} />
    }
  }

  return (
    <div className="pt-2">
      <div className="flex flex-col mx-2">
        <label className="text-text-light dark:text-text-dark mb-1 ml-2">
          Transaction Type
        </label>
        <TransactionTypeSelect
          value={transactionType}
          setValue={setTransactionType}
        />
      </div>
      {body()}
    </div>
  )
}

export default AddStandingOrder
