import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
import { Entity } from "../../../../types/Api"
import { BankTransferStandingOrder } from "../../../../types/StandingOrders"
import FrequencyInput from "../../../inputs/FrequencyInput"
import BankTransferInputs from "../../new-transaction/bank-transfer/BankTransferInputs"
import FormButtons from "../FormButtons"
import { validateBankTransferStandingOrder } from "../validation"
import {
  emptyBankTransferStandingOrder,
  emptyBankTransferStandingOrderErrors
} from "./defaults"

interface BankTransferFormProps {
  closeDialog: () => void
  initialState?: Entity<BankTransferStandingOrder>
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({
  closeDialog,
  initialState
}) => {
  const id = initialState?.id

  const startingData = initialState
    ? () => initialState.domain
    : emptyBankTransferStandingOrder

  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder,
    updateStandingOrder
  } = useStandingOrderControl(
    startingData,
    emptyBankTransferStandingOrderErrors(),
    validateBankTransferStandingOrder,
    "bank-transfer",
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
        <BankTransferInputs
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

export default BankTransferForm
