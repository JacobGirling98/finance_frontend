import { FC, useState } from "react"
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

  const [id, setId] = useState(initialState?.id)

  const startingData = initialState ? () => initialState.domain : emptyCreditDebitStandingOrder

  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder
  } = useStandingOrderControl(
    startingData,
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
