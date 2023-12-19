import { Entity } from "../../../../types/Api"
import { Income, PersonalTransfer } from "../../../../types/NewMoney"
import {
  validateIncome,
  validatePersonalTransfer
} from "../../new-transaction/validation"
import useTransactionControl from "../../../../hooks/useTransactionControl"
import FormButtons from "../../standing-order/FormButtons"
import { emptyIncomeErrors } from "../../new-transaction/income/defaults"
import IncomeInputs from "../../new-transaction/income/IncomeInputs"
import { emptyPersonalTransferErrors } from "../../new-transaction/personal-transfer/defaults"
import PersonalTransferInputs from "../../new-transaction/personal-transfer/PersonalTransferInputs"

interface PersonalTransferFormProps {
  closeDialog: () => void
  initialState: Entity<PersonalTransfer>
}

const PersonalTransferForm = ({
  closeDialog,
  initialState
}: PersonalTransferFormProps) => {
  const id = initialState.id

  const startingData = () => initialState.domain

  const {
    transaction,
    validationErrors,
    changeTransaction,
    updateTransaction
  } = useTransactionControl(
    startingData,
    emptyPersonalTransferErrors(),
    validatePersonalTransfer,
    "personal-transfer",
    closeDialog
  )

  return (
    <div>
      <PersonalTransferInputs
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

export default PersonalTransferForm
