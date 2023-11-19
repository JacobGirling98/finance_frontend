import { FC, useEffect, useRef } from "react"
import { CreditDebit, ValidationErrors } from "../../../../types/NewMoney"
import CurrencyInput from "../../../inputs/CurrencyInput"
import Input from "../../../inputs/Input"
import NumberInput from "../../../inputs/NumberInput"
import TypeableSelect from "../../../inputs/select/TypeableSelect"
import useReferenceData from "../../../../hooks/useReferenceData"

interface CreditDebitInputsProps {
  data: CreditDebit
  handleChange: (value: string | number, field: keyof CreditDebit) => void
  errors: ValidationErrors<CreditDebit>
  focusValueInput?: boolean
}

const CreditDebitInputs: FC<CreditDebitInputsProps> = ({
  data,
  handleChange,
  errors,
  focusValueInput
}) => {
  const { categories, uniqueDescriptions, addNewDescription, addCategory } =
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
          showAllOptions={true}
          allowCreate={true}
          onCreate={addCategory}
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

export default CreditDebitInputs
