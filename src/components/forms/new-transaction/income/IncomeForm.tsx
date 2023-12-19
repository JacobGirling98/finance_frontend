import { FC } from "react"
import useTransactionsControl from "../../../../hooks/useTransactionsControl"
import { validateIncome } from "../validation"
import FormButtons from "../FormButtons"
import IncomeRow from "./IncomeRow"
import Spinner from "../../../utils/Spinner"
import { emptyIncome, emptyIncomeErrors } from "./defaults"

const IncomeForm: FC = () => {
  const {
    transactions,
    validationErrors,
    addTransaction,
    clearTransactions,
    deleteRow,
    changeTransaction,
    submitTransactions,
    onlyOneRow,
    isLoading
  } = useTransactionsControl(
    emptyIncome,
    emptyIncomeErrors(),
    validateIncome,
    "income"
  )

  return (
    <>
      <div>
        {transactions.map((_transaction, index) => (
          <IncomeRow
            data={transactions[index]}
            index={index}
            handleDelete={deleteRow}
            isLastRow={onlyOneRow}
            handleChange={changeTransaction}
            errors={validationErrors[index]}
            focusValueInput={transactions.length > 1}
          />
        ))}
      </div>
      <div className="flex m-5">
        <FormButtons
          handleSubmit={submitTransactions}
          handleAddTransaction={addTransaction}
          handleClear={clearTransactions}
          transactionType="income"
        />
      </div>
      <Spinner isOpen={isLoading} />
    </>
  )
}

export default IncomeForm
