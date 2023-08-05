import { FC } from "react"
import { Income, ValidationErrors } from "../../../../types/NewMoney"
import DeleteRowButton from "../../../button/DeleteRowButton"
import IncomeInputs from "./IncomeInputs"

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
  const handleChangeWrapper = (value: string | number, field: keyof Income) =>
    handleChange(index, value, field)

  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-4 mx-6 flex-grow">
        <IncomeInputs
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

export default IncomeRow
