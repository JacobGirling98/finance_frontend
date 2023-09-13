import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
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
}

const IncomeForm: React.FC<IncomeFormProps> = ({
  closeDialog
}) => {
  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder
  } = useStandingOrderControl(
    emptyIncomeStandingOrder,
    emptyIncomeStandingOrderErrors(),
    validateIncomeStandingOrder,
    "income",
    closeDialog
  )

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
          <FormButtons submit={submitStandingOrder} closeDialog={closeDialog} />
        </div>
      </div>
    </>
  )
}

export default IncomeForm
