import React, {FC} from "react";
import useFormControl from "../../../../hooks/useFormControl";
import {validateIncome} from "../validation";
import FormButtons from "../FormButtons";
import IncomeRow from "./IncomeRow";
import {Income, ValidationErrors} from "../../../../types/NewMoney";

const emptyIncome = (date: string, category: string): Income => ({
  ...({
    category, date, description: "", source: "", value: 0
  })
})

const emptyIncomeErrors = (): ValidationErrors<Income> => ({
  ...({
    category: "", date: "", description: "", source: "", value: ""
  })
})

const IncomeForm: FC = () => {
  const {
    transactions,
    validationErrors,
    addTransaction,
    clearTransactions,
    deleteRow,
    changeTransaction,
    submitTransactions,
    onlyOneRow
  } = useFormControl(emptyIncome, emptyIncomeErrors(), validateIncome, "income")

  return (
    <>
      <div>
        {transactions.map((transaction, index) => (
          <IncomeRow
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

export default IncomeForm;