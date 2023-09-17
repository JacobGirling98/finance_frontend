import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
import { Entity } from "../../../../types/Api"
import { PersonalTransferStandingOrder } from "../../../../types/StandingOrders"
import FrequencyInput from "../../../inputs/FrequencyInput"
import PersonalTransferInputs from "../../new-transaction/personal-transfer/PersonalTransferInputs"
import FormButtons from "../FormButtons"
import { validatePersonalTransferStandingOrder } from "../validation"
import {
  emptyPersonalTransferStandingOrder,
  emptyPersonalTransferStandingOrderErrors
} from "./defaults"

interface PersonalTransferFormProps {
  closeDialog: () => void
  initialState?: Entity<PersonalTransferStandingOrder>
}

const PersonalTransferForm: React.FC<PersonalTransferFormProps> = ({
  closeDialog,
  initialState
}) => {
  const id = initialState?.id

  const startingData = initialState
    ? () => initialState.domain
    : emptyPersonalTransferStandingOrder

  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder,
    updateStandingOrder
  } = useStandingOrderControl(
    startingData,
    emptyPersonalTransferStandingOrderErrors(),
    validatePersonalTransferStandingOrder,
    "personal-transfer",
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
        <PersonalTransferInputs
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

export default PersonalTransferForm
