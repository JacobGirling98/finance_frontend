import { FC } from "react"
import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
import {
  emptyCreditDebitStandingOrder,
  emptyCreditDebitStandingOrderErrors
} from "./defaults"
import { validateCreditDebitStandingOrder } from "../validation"
import CreditDebitInputs from "../../new-transaction/credit-debit/CreditDebitInputs"
import FrequencyInput from "../../../inputs/FrequencyInput"
import FormButtons from "../FormButtons"

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
  closeDialog: () => void
}

const CreditDebitForm: FC<CreditDebitFormProps> = ({
  transactionType,
  closeDialog
}) => {
  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder
  } = useStandingOrderControl(
    emptyCreditDebitStandingOrder,
    emptyCreditDebitStandingOrderErrors(),
    validateCreditDebitStandingOrder,
    transactionType,
    closeDialog
  )

  return (
    <div>
      <FrequencyInput
        frequencyQuantity={standingOrder.frequencyQuantity}
        setFrequencyQuantity={(quantity) =>
          changeStandingOrder(quantity, "frequencyQuantity")
        }
        frequencyUnit={standingOrder.frequencyUnit}
        setFrequencyUnit={(unit) => changeStandingOrder(unit, "frequencyUnit")}
        validationError={validationErrors.frequencyQuantity}
      />
      <CreditDebitInputs
        data={standingOrder}
        errors={validationErrors}
        handleChange={changeStandingOrder}
      />
      <div className="mt-3 flex justify-center">
        <FormButtons submit={submitStandingOrder} closeDialog={closeDialog} />
      </div>
    </div>
  )
}

export default CreditDebitForm
