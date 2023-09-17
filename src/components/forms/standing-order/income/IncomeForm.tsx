import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
import { Entity } from "../../../../types/Api"
import { IncomeStandingOrder } from "../../../../types/StandingOrders"
import FrequencyInput from "../../../inputs/FrequencyInput"
import IncomeInputs from "../../new-transaction/income/IncomeInputs"
import FormButtons from "../FormButtons"
import { validateIncomeStandingOrder } from "../validation"
import {
  emptyIncomeStandingOrder,
  emptyIncomeStandingOrderErrors
} from "./defaults"

interface IncomeFormProps {
  closeDialog: () => void
  initialState?: Entity<IncomeStandingOrder>
}

const IncomeForm: React.FC<IncomeFormProps> = ({
  closeDialog,
  initialState
}) => {
  const id = initialState?.id

  const startingData = initialState
    ? () => initialState.domain
    : emptyIncomeStandingOrder

  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder,
    updateStandingOrder
  } = useStandingOrderControl(
    startingData,
    emptyIncomeStandingOrderErrors(),
    validateIncomeStandingOrder,
    "income",
    closeDialog
  )

  const onSubmit = id ? () => updateStandingOrder(id) : submitStandingOrder

  return (
    <>
      <div>
        <FrequencyInput
          frequencyQuantity={standingOrder.frequencyQuantity}
          setFrequencyQuantity={(quantity) =>
            changeStandingOrder(quantity, "frequencyQuantity")
          }
          frequencyUnit={standingOrder.frequencyUnit}
          setFrequencyUnit={(unit) =>
            changeStandingOrder(unit, "frequencyUnit")
          }
          validationError={validationErrors.frequencyQuantity}
        />
        <IncomeInputs
          data={standingOrder}
          errors={validationErrors}
          handleChange={changeStandingOrder}
        />
        <div className="mt-3 flex justify-center">
          <FormButtons submit={onSubmit} closeDialog={closeDialog} />
        </div>
      </div>
    </>
  )
}

export default IncomeForm
