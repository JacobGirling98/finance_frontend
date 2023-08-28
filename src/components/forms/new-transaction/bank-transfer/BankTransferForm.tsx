import { FC } from "react"
import useFormControl from "../../../../hooks/useFormControl"
import { validateBankTransfer } from "../validation"
import FormButtons from "../FormButtons"
import BankTransferRow from "./BankTransferRow"
import Spinner from "../../../utils/Spinner"
import { emptyBankTransfer, emptyBankTransferErrors } from "./defaults"

const BankTransferForm: FC = () => {
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
  } = useFormControl(
    emptyBankTransfer,
    emptyBankTransferErrors(),
    validateBankTransfer,
    "bank-transfer"
  )

  return (
    <>
      <div>
        {transactions.map((_transaction, index) => (
          <BankTransferRow
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
          transactionType="bank-transfer"
        />
      </div>
      <Spinner isOpen={isLoading} />
    </>
  )
}

export default BankTransferForm
