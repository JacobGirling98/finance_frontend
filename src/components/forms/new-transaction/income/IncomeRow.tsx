import { FC, useEffect, useRef } from "react"
import CurrencyInput from "../../../inputs/CurrencyInput"
import Input from "../../../inputs/Input"
import TypeableSelect from "../../../inputs/select/TypeableSelect"
import { Income, ValidationErrors } from "../../../../types/NewMoney"
import DeleteRowButton from "../../../button/DeleteRowButton"
import useReferenceData from "../../../../hooks/useReferenceData"

interface IncomeRowProps {
  data: Income
  index: number
  handleDelete: (index: number) => void
  isLastRow: boolean
  handleChange: (
    index: number,
    value: string | number,
    field: keyof Income
  ) => void
  errors: ValidationErrors<Income>
  focusValueInput?: boolean
}

const IncomeRow: FC<IncomeRowProps> = ({
  data,
  index,
  handleDelete,
  isLastRow,
  handleChange,
  errors,
  focusValueInput = false,
}) => {
  const valueInputRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    if (focusValueInput) valueInputRef.current?.focus()
  }, [focusValueInput])

  const { categories, sources, uniqueDescriptions, addNewDescription } =
    useReferenceData()

  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-4 mx-6 flex-grow">
        <div className="flex flex-col mx-2">
          <Input
            title="Date"
            key="date"
            type="date"
            value={data.date}
            onChange={(value) => handleChange(index, value, "date")}
            error={errors.date}
          />
        </div>
        <div className="flex flex-col mx-2">
          <TypeableSelect
            title="Category"
            selected={data.category}
            setSelected={(value) => handleChange(index, value, "category")}
            options={categories}
            error={errors.category}
          />
        </div>
        <div className="flex flex-col mx-2">
          <TypeableSelect
            title="Source"
            selected={data.source}
            setSelected={(value) => handleChange(index, value, "source")}
            options={sources}
            error={errors.source}
          />
        </div>
        <div className="flex flex-col mx-2">
          <CurrencyInput
            title="Value"
            value={data.value}
            handleValueChange={(value) => handleChange(index, value, "value")}
            error={errors.value}
            ref={valueInputRef}
          />
        </div>
        <div className="flex flex-col mx-2">
          <TypeableSelect
            title="Description"
            selected={data.description}
            setSelected={(value) => handleChange(index, value, "description")}
            options={uniqueDescriptions}
            allowCreate={true}
            error={errors.description}
            onCreate={addNewDescription}
            showAllOptions={false}
          />
        </div>
      </div>
      <div className="mt-8 ml-auto mr-6">
        <DeleteRowButton
          index={index}
          handleDelete={handleDelete}
          disabled={isLastRow}
        />
      </div>
    </div>
  )
}

export default IncomeRow
