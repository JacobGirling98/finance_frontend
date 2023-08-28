import useFormControl from "../../../../hooks/useFormControl"
import { validatePersonalTransfer } from "../validation"
import FormButtons from "../FormButtons"
import PersonalTransferRow from "./PersonalTransferRow"
import Spinner from "../../../utils/Spinner"
import { FC } from "react"
import { emptyPersonalTransfer, emptyPersonalTransferErrors } from "./defaults"

const PersonalTransferForm: FC = () => {
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
    emptyPersonalTransfer,
    emptyPersonalTransferErrors(),
    validatePersonalTransfer,
    "personal-transfer"
  )

  return (
    <>
      <div>
        {transactions.map((_transaction, index) => (
          <PersonalTransferRow
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
          transactionType="personal-transfer"
        />
      </div>
      <Spinner isOpen={isLoading} />
    </>
  )
}

export default PersonalTransferForm
