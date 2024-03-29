import { FC } from "react"
import DeleteRowButton from "../../../button/DeleteRowButton"
import { CreditDebit, ValidationErrors } from "../../../../types/NewMoney"
import CreditDebitInputs from "./CreditDebitInputs"

interface CreditDebitRowProps {
  data: CreditDebit
  index: number
  handleDelete: (index: number) => void
  isLastRow: boolean
  handleChange: (
    index: number,
    value: string | number,
    field: keyof CreditDebit
  ) => void
  errors: ValidationErrors<CreditDebit>
  focusValueInput?: boolean
}

const CreditDebitRow: FC<CreditDebitRowProps> = ({
  data,
  index,
  handleDelete,
  isLastRow,
  handleChange,
  errors,
  focusValueInput = false
}) => {
  const handleChangeWrapper = (
    value: string | number,
    field: keyof CreditDebit
  ) => handleChange(index, value, field)

  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-4 mx-6 grow">
        <CreditDebitInputs
          data={data}
          handleChange={handleChangeWrapper}
          errors={errors}
          focusValueInput={focusValueInput}
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

export default CreditDebitRow
