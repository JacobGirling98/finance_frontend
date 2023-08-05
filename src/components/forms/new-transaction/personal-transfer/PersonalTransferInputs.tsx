import { FC, useEffect, useRef } from "react"
import { PersonalTransfer, ValidationErrors } from "../../../../types/NewMoney"
import CurrencyInput from "../../../inputs/CurrencyInput"
import Input from "../../../inputs/Input"
import TypeableSelect from "../../../inputs/select/TypeableSelect"
import useReferenceData from "../../../../hooks/useReferenceData"

interface PersonalTransferInputsProps {
  data: PersonalTransfer
  handleChange: (value: string | number, field: keyof PersonalTransfer) => void
  errors: ValidationErrors<PersonalTransfer>
  focusValueInput?: boolean
}

const PersonalTransferInputs: FC<PersonalTransferInputsProps> = ({
  data,
  handleChange,
  errors,
  focusValueInput,
}) => {
  const valueInputRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    if (focusValueInput) valueInputRef.current?.focus()
  }, [focusValueInput])

  const { categories, accounts, uniqueDescriptions, addNewDescription } =
    useReferenceData()

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
        />
      </div>
      <div className="flex flex-col mx-2">
        <TypeableSelect
          title="Outbound"
          selected={data.outbound}
          setSelected={(value) => handleChange(value, "outbound")}
          options={accounts.map((a) => a.domain)}
          error={errors.outbound}
        />
      </div>
      <div className="flex flex-col mx-2">
        <TypeableSelect
          title="Inbound"
          selected={data.inbound}
          setSelected={(value) => handleChange(value, "inbound")}
          options={accounts.map((a) => a.domain)}
          error={errors.inbound}
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

export default PersonalTransferInputs
