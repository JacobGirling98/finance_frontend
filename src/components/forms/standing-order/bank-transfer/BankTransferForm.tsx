import useStandingOrderControl from "../../../../hooks/useStandingOrderControl"
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
}

const BankTransferForm: React.FC<BankTransferFormProps> = ({ closeDialog }) => {
  const {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder
  } = useStandingOrderControl(
    emptyBankTransferStandingOrder,
    emptyBankTransferStandingOrderErrors(),
    validateBankTransferStandingOrder,
    "bank-transfer",
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
        <BankTransferInputs
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

export default BankTransferForm
