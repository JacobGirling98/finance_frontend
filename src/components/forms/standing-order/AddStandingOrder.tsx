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
      
    </div>
  )
}

export default AddStandingOrder
