import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
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
}

const PersonalTransferForm: React.FC<PersonalTransferFormProps> = ({
  closeDialog
}) => {
  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder
  } = useStandingOrderControl(
    emptyPersonalTransferStandingOrder,
    emptyPersonalTransferStandingOrderErrors(),
    validatePersonalTransferStandingOrder,
    "personal-transfer",
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
        <PersonalTransferInputs
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

export default PersonalTransferForm
