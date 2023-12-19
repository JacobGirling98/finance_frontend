import { useFormAction } from "react-router-dom"
import { Entity } from "../../../../types/Api"
import { CreditDebit } from "../../../../types/NewMoney"
import useTransactionsControl from "../../../../hooks/useTransactionsControl"
import {
  emptyCreditDebit,
  emptyCreditDebitErrors
} from "../../new-transaction/credit-debit/defaults"
import { validateCreditDebit } from "../../new-transaction/validation"
import CreditDebitInputs from "../../new-transaction/credit-debit/CreditDebitInputs"
import useTransactionControl from "../../../../hooks/useTransactionControl"
import FormButtons from "../../standing-order/FormButtons"

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
  closeDialog: () => void
  initialState: Entity<CreditDebit>
}

const CreditDebitForm = ({
  transactionType,
  closeDialog,
  initialState
}: CreditDebitFormProps) => {
  const id = initialState.id

  const startingData = () => initialState.domain

  const {
    transaction,
    validationErrors,
    changeTransaction,
    updateTransaction
  } = useTransactionControl(
    startingData,
    emptyCreditDebitErrors(),
    validateCreditDebit,
    transactionType,
    closeDialog
  )

  return (
    <div>
      <CreditDebitInputs
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

export default CreditDebitForm
