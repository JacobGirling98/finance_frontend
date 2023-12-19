import { Entity } from "../../../../types/Api"
import { Income } from "../../../../types/NewMoney"
import { validateIncome } from "../../new-transaction/validation"
import useTransactionControl from "../../../../hooks/useTransactionControl"
import FormButtons from "../../standing-order/FormButtons"
import { emptyIncomeErrors } from "../../new-transaction/income/defaults"
import IncomeInputs from "../../new-transaction/income/IncomeInputs"

interface IncomeFormProps {
  closeDialog: () => void
  initialState: Entity<Income>
}

const IncomeForm = ({ closeDialog, initialState }: IncomeFormProps) => {
  const id = initialState.id

  const startingData = () => initialState.domain

  const {
    transaction,
    validationErrors,
    changeTransaction,
    updateTransaction
  } = useTransactionControl(
    startingData,
    emptyIncomeErrors(),
    validateIncome,
    "income",
    closeDialog
  )

  return (
    <div>
      <IncomeInputs
        data={transaction}
        errors={validationErrors}
        handleChange={changeTransaction}
      />
      <div className="mt-3 flex justify-center">
        <FormButtons
          submit={() => updateTransaction(id)}
          closeDialog={closeDialog}
        />
      </div>
    </div>
  )
}

export default IncomeForm
