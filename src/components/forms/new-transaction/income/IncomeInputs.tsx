import { FC, useEffect, useRef } from "react"
import { Income, ValidationErrors } from "../../../../types/NewMoney"
import CurrencyInput from "../../../inputs/CurrencyInput"
import Input from "../../../inputs/Input"
import TypeableSelect from "../../../inputs/select/TypeableSelect"
import useReferenceData from "../../../../hooks/useReferenceData"

interface IncomeInputsProps {
  data: Income
  handleChange: (value: string | number, field: keyof Income) => void
  errors: ValidationErrors<Income>
  focusValueInput?: boolean
}

const IncomeInputs: FC<IncomeInputsProps> = ({
  data,
  handleChange,
  errors,
  focusValueInput,
}) => {
  const { categories, sources, uniqueDescriptions, addNewDescription, addCategory, addSource } =
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
          options={categories.map((c) => c.domain)}
          error={errors.category}
          allowCreate={true}
          onCreate={addCategory}
        />
      </div>
      <div className="flex flex-col mx-2">
        <TypeableSelect
          title="Source"
          selected={data.source}
          setSelected={(value) => handleChange(value, "source")}
          options={sources.map((s) => s.domain)}
          error={errors.source}
          allowCreate={true}
          onCreate={addSource}
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

export default IncomeInputs
