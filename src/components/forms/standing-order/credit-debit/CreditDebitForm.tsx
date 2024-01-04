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
import { Entity } from "../../../../types/Api"
import { CreditDebitStandingOrder } from "../../../../types/StandingOrders"

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
  closeDialog: () => void
  initialState?: Entity<CreditDebitStandingOrder>
}

const CreditDebitForm: FC<CreditDebitFormProps> = ({
  transactionType,
  closeDialog,
  initialState
}) => {
  const id = initialState?.id

  const startingData = initialState
    ? () => initialState.domain
    : emptyCreditDebitStandingOrder

  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder,
    updateStandingOrder
  } = useStandingOrderControl(
    startingData,
    emptyCreditDebitStandingOrderErrors(),
    validateCreditDebitStandingOrder,
    transactionType,
    closeDialog
  )

  const onSubmit = id ? () => updateStandingOrder(id) : submitStandingOrder

  return (
    <div>
      <FrequencyInput
        frequencyQuantity={standingOrder.frequencyQuantity}
        setFrequencyQuantity={(quantity) =>
          changeStandingOrder(quantity, "frequencyQuantity")
        }
        frequencyUnit={standingOrder.frequency}
        setFrequencyUnit={(unit) => changeStandingOrder(unit, "frequency")}
        validationError={validationErrors.frequencyQuantity}
      />
      <CreditDebitInputs
        data={standingOrder}
        errors={validationErrors}
        handleChange={changeStandingOrder}
      />
      <div className="mt-3 flex justify-center">
        <FormButtons submit={onSubmit} closeDialog={closeDialog} />
      </div>
    </div>
  )
}

export default CreditDebitForm
