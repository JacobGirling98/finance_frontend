import TransactionTypeSelect from "../../inputs/select/TransactionTypeSelect"
import useTransactionType from "../../../hooks/useTransactionType"
import CreditDebitForm from "./credit-debit/CreditDebitForm"
import { useState } from "react"
import { frequencyValues } from "../../../constants/frequency"
import FrequencyInput from "../../inputs/FrequencyInput"

const AddStandingOrder = () => {
  const { transactionType, setTransactionType } = useTransactionType()
  const [frequencyQuanity, setFrequencyQuantity] = useState(1)
  const [frequencyUnit, setFrequencyUnit] = useState(frequencyValues[0])

  return (
    <div className="p-2">
      <div className="flex flex-col mx-2">
        <label className="text-text-light dark:text-text-dark mb-1 ml-2">
          Transaction Type
        </label>
        <TransactionTypeSelect
          value={transactionType}
          setValue={setTransactionType}
        />
      </div>
      <FrequencyInput
        frequencyQuantity={frequencyQuanity}
        setFrequencyQuantity={setFrequencyQuantity}
        frequencyUnit={frequencyUnit}
        setFrequencyUnit={setFrequencyUnit}
      />
      <CreditDebitForm transactionType="debit" />
    </div>
  )
}

export default AddStandingOrder
