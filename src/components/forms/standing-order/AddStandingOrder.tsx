import { useState } from "react"
import CreditDebitInputs from "../new-transaction/credit-debit/CreditDebitInputs"
import { CreditDebit, ValidationErrors } from "../../../types/NewMoney"
import { changeSingleTransaction } from "../new-transaction/changeTransaction"

const AddStandingOrder = () => {
  const [data, setData] = useState<CreditDebit>({
    category: "",
    date: "",
    description: "",
    quantity: 0,
    value: 0,
  })

  const [validationErrors, setValidationErrors] = useState<ValidationErrors<CreditDebit>>({
    category: "",
    date: "",
    description: "",
    quantity: "",
    value: "",
  })

  const handleChange = (value: string | number, field: keyof CreditDebit) => {
    setData(data => changeSingleTransaction(data, value, field))
  }

  return (
    <div className="p-2">
      <CreditDebitInputs
        data={data}
        handleChange={handleChange}
        errors={validationErrors}
      />
    </div>
  )
}

export default AddStandingOrder
