import { frequencyValues } from "../../constants/frequency"
import Input from "./Input"
import Select from "./select/Select"

interface FrequencyInputProps {
  frequencyQuantity: number
  setFrequencyQuantity: (_: number) => void
  frequencyUnit: string
  setFrequencyUnit: (_: string) => void
  validationError: string
}

const FrequencyInput: React.FC<FrequencyInputProps> = ({
  frequencyQuantity,
  setFrequencyQuantity,
  frequencyUnit,
  setFrequencyUnit,
  validationError
}) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-text-light dark:text-text-dark ml-4 mb-1">
          Frequency
        </label>
        <div className="flex flex-row mx-2 space-x-2">
          <div className="w-1/3 flex flex-col">
            <Input
              type="number"
              value={frequencyQuantity}
              onChange={e => setFrequencyQuantity(parseFloat(e))}
              error={validationError}
            />
          </div>

          <div className="w-2/3">
            <Select
              value={frequencyUnit}
              onChange={setFrequencyUnit}
              options={frequencyValues}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FrequencyInput
