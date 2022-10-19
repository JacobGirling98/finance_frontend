import React, {FC} from "react";
import {emptyCreditDebit, emptyCreditDebitErrors} from "../../../../utils/defaults";
import useFormControl from "../../../../hooks/useFormControl";
import {validateCreditDebit} from "../validation";
import CreditDebitRow from "./CreditDebitRow";
import FormButtons from "../FormButtons";

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
}

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
  } = useFormControl(emptyCreditDebit(), emptyCreditDebitErrors(), validateCreditDebit, transactionType)

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