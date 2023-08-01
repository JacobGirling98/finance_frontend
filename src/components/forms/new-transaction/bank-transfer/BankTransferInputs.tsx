import { useRef, useEffect } from "react"
import useReferenceData from "../../../../hooks/useReferenceData"
import { BankTransfer, ValidationErrors } from "../../../../types/NewMoney"
import CurrencyInput from "../../../inputs/CurrencyInput"
import Input from "../../../inputs/Input"
import NumberInput from "../../../inputs/NumberInput"
import TypeableSelect from "../../../inputs/select/TypeableSelect"

interface BankTransferInputsProps {
  data: BankTransfer
  handleChange: (value: string | number, field: keyof BankTransfer) => void
  errors: ValidationErrors<BankTransfer>
  focusValueInput?: boolean
}

const BankTransferInputs: React.FC<BankTransferInputsProps> = ({
  data,
  handleChange,
  errors,
  focusValueInput,
}) => {
  const { categories, payees, uniqueDescriptions, addNewDescription } =
    useReferenceData()

  const valueInputRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    if (focusValueInput) valueInputRef.current?.focus()
  }, [focusValueInput])

  return (
    <>
      <div className="flex flex-col mx-2">
        <Input
          title="Date"
          key="date"
          type="date"
          value={data.date}
          onChange={(value) => handleChange(value, "date")}
          error={errors.date}
        />
      </div>
      <div className="flex flex-col mx-2">
        <TypeableSelect
          title="Category"
          selected={data.category}
          setSelected={(value) => handleChange(value, "category")}
          options={categories.map((cat) => cat.domain)}
          error={errors.category}
        />
      </div>
      <div className="flex flex-col mx-2">
        <TypeableSelect
          title="Recipient"
          selected={data.recipient}
          setSelected={(value) => handleChange(value, "recipient")}
          options={payees.map((p) => p.domain)}
          error={errors.recipient}
        />
      </div>
      <div className="flex flex-col mx-2">
        <CurrencyInput
          title="Value"
          value={data.value}
          handleValueChange={(value) => handleChange(value, "value")}
          error={errors.value}
          ref={valueInputRef}
        />
      </div>
      <div className="flex flex-col mx-2">
        <NumberInput
          key="quantity"
          value={data.quantity}
          onChange={(value) => handleChange(value, "quantity")}
          error={errors.quantity}
        />
      </div>
      <div className="flex flex-col mx-2">
        <TypeableSelect
          title="Description"
          selected={data.description}
          setSelected={(value) => handleChange(value, "description")}
          options={uniqueDescriptions}
          allowCreate={true}
          error={errors.description}
          onCreate={addNewDescription}
          showAllOptions={false}
        />
      </div>
    </>
  )
}

export default BankTransferInputs
