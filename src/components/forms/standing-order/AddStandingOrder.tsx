import { useState } from "react"
import Input from "../../inputs/Input"
import Select from "../../inputs/select/Select"
import TypeableSelect from "../../inputs/select/TypeableSelect"
import useReferenceData from "../../../hooks/useReferenceData"
import CurrencyInput from "../../inputs/CurrencyInput"

const AddStandingOrder = () => {
  const [date, setDate] = useState<string>("")
  const [frequency, setFrequency] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [value, setValue] = useState<number>(0)

  const { categories } = useReferenceData()

  return (
    <div className="p-2">
      <div className="flex">
        <p>Date</p>
        <Input type={"date"} value={date} onChange={setDate} />
      </div>
      <div className="flex">
        <p>Frequency</p>
        <div className="w-full">
          <Select
            value={frequency}
            onChange={setFrequency}
            options={["Monthly", "Weekly"]}
          />
        </div>
      </div>
      <div className="flex">
        <p>Category</p>
        <div className="w-full">
          <TypeableSelect
            selected={category}
            setSelected={setCategory}
            options={categories.map(c => c.domain)}
            showAllOptions={true}
          />
        </div>
      </div>
      <div className="flex">
        <p>Value</p>
        <div className="w-full">
          <CurrencyInput value={value} handleValueChange={setValue} />
        </div>
      </div>
    </div>
  )
}

export default AddStandingOrder
