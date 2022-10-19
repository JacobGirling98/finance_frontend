import React, {FC} from "react";
import useFormControl from "../../../../hooks/useFormControl";
import {validateCreditDebit} from "../validation";
import CreditDebitRow from "./CreditDebitRow";
import FormButtons from "../FormButtons";
import {CreditDebit, ValidationErrors} from "../../../../types/NewMoney";

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
}

const emptyCreditDebit = (date: string, category: string): CreditDebit => ({
  ...({
    category, date, description: "", quantity: 0, value: 0
  })
})

const emptyCreditDebitErrors = (): ValidationErrors<CreditDebit> => ({
  ...({
    category: "", date: "", description: "", quantity: "", value: ""
  })
})

const CreditDebitForm: FC<CreditDebitFormProps> = (
  {
    transactionType
  }
) => {
  const {
    transactions,
    validationErrors,
    addTransaction,
    clearTransactions,
    deleteRow,
    changeTransaction,
    submitTransactions,
    onlyOneRow
  } = useFormControl(emptyCreditDebit, emptyCreditDebitErrors(), validateCreditDebit, transactionType)

  return (
    <>
      <div>
        {transactions.map((transaction, index) => (
          <CreditDebitRow
            data={transactions[index]}
            index={index}
            handleDelete={deleteRow}
            isLastRow={onlyOneRow}
            handleChange={changeTransaction}
            errors={validationErrors[index]}
          />
        ))}
      </div>
      <div className="flex m-5">
        <FormButtons
          handleSubmit={submitTransactions}
          handleAddTransaction={addTransaction}
          handleClear={clearTransactions}
        />
      </div>
    </>
  )
}

export default CreditDebitForm