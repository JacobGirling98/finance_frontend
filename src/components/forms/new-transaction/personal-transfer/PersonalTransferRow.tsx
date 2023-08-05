import { FC } from "react"
import { PersonalTransfer, ValidationErrors } from "../../../../types/NewMoney"
import DeleteRowButton from "../../../button/DeleteRowButton"
import PersonalTransferInputs from "./PersonalTransferInputs"

interface PersonalTransferRowProps {
  data: PersonalTransfer
  index: number
  handleDelete: (index: number) => void
  isLastRow: boolean
  handleChange: (
    index: number,
    value: string | number,
    field: keyof PersonalTransfer
  ) => void
  errors: ValidationErrors<PersonalTransfer>
  focusValueInput?: boolean
}

const PersonalTransferRow: FC<PersonalTransferRowProps> = ({
  data,
  index,
  handleDelete,
  isLastRow,
  handleChange,
  errors,
  focusValueInput = false,
}) => {
  const handleChangeWrapper = (
    value: string | number,
    field: keyof PersonalTransfer
  ) => handleChange(index, value, field)

  return (
    <div className="flex">
      <div className="grid grid-cols-6 gap-4 mx-6 flex-grow">
        <PersonalTransferInputs
          data={data}
          errors={errors}
          focusValueInput={focusValueInput}
          handleChange={handleChangeWrapper}
        />
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

export default PersonalTransferRow
