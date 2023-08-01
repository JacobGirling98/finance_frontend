import { FC, useEffect, useRef } from "react"
import Input from "../../../inputs/Input"
import TypeableSelect from "../../../inputs/select/TypeableSelect"
import { BankTransfer, ValidationErrors } from "../../../../types/NewMoney"
import CurrencyInput from "../../../inputs/CurrencyInput"
import NumberInput from "../../../inputs/NumberInput"
import DeleteRowButton from "../../../button/DeleteRowButton"
import useReferenceData from "../../../../hooks/useReferenceData"
import BankTransferInputs from "./BankTransferInputs"

interface BankTransferRowProps {
  data: BankTransfer
  index: number
  handleDelete: (index: number) => void
  isLastRow: boolean
  handleChange: (
    index: number,
    value: string | number,
    field: keyof BankTransfer
  ) => void
  errors: ValidationErrors<BankTransfer>
  focusValueInput?: boolean
}

const BankTransferRow: FC<BankTransferRowProps> = ({
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
    field: keyof BankTransfer
  ) => handleChange(index, value, field)

  return (
    <div className="flex">
      <div className="grid grid-cols-6 gap-4 mx-6 flex-grow">
        <BankTransferInputs
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

export default BankTransferRow
