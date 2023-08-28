import TransactionTypeSelect from "../../inputs/select/TransactionTypeSelect"
import useTransactionType from "../../../hooks/useTransactionType"
import CreditDebitForm from "./credit-debit/CreditDebitForm"

const AddStandingOrder = () => {
  const {transactionType, setTransactionType} = useTransactionType()


  return (
    <div className="p-2">
      <label
          className="text-text-light dark:text-text-dark mb-1 ml-4"
        >
          Transaction Type
        </label>
      <TransactionTypeSelect
        value={transactionType}
        setValue={setTransactionType}
      />
      <CreditDebitForm transactionType="debit"/>
    </div>
  )
}

export default AddStandingOrder
