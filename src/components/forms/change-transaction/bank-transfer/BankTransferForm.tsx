import { Entity } from "../../../../types/Api"
import { BankTransfer } from "../../../../types/NewMoney"
import { validateBankTransfer } from "../../new-transaction/validation"
import useTransactionControl from "../../../../hooks/useTransactionControl"
import FormButtons from "../../standing-order/FormButtons"
import BankTransferInputs from "../../new-transaction/bank-transfer/BankTransferInputs"
import { emptyBankTransferErrors } from "../../new-transaction/bank-transfer/defaults"

interface BankTransferFormProps {
  closeDialog: () => void
  initialState: Entity<BankTransfer>
}

const BankTransferForm = ({
  closeDialog,
  initialState
}: BankTransferFormProps) => {
  const id = initialState.id

  const startingData = () => initialState.domain

  const {
    transaction,
    validationErrors,
    changeTransaction,
    updateTransaction
  } = useTransactionControl(
    startingData,
    emptyBankTransferErrors(),
    validateBankTransfer,
    "bank-transfer",
    closeDialog
  )

  return (
    <div>
      <BankTransferInputs
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

export default BankTransferForm
