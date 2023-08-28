import { FC } from "react"
import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
import {
  emptyCreditDebitStandingOrder,
  emptyCreditDebitStandingOrderErrors
} from "./defaults"
import { validateCreditDebitStandingOrder } from "../validation"
import CreditDebitInputs from "../../new-transaction/credit-debit/CreditDebitInputs"

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
}

const CreditDebitForm: FC<CreditDebitFormProps> = ({ transactionType }) => {
  const {
    standingOrder,
    validationErrors,
    changeStandingOrder
  } = useStandingOrderControl(
    emptyCreditDebitStandingOrder,
    emptyCreditDebitStandingOrderErrors(),
    validateCreditDebitStandingOrder,
    transactionType
  )

  return (
    <CreditDebitInputs
      data={standingOrder}
      errors={validationErrors}
      handleChange={changeStandingOrder}
    />
  )
}

export default CreditDebitForm
