import { FC, useState } from "react";
import CurrencyInput from "./inputs/CurrencyInput";
import Input from "./inputs/Input";
import NumberInput from "./inputs/NumberInput";
import Select from "./inputs/Select";
import { TrashIcon } from "@heroicons/react/24/solid";

const categories = ["Food", "Tech", "Gaming"];
const descriptions = ["Rent", "Game", "Book"];
const accounts = ["Current", "Savings"]


const PersonalTransferRow: FC = () => {
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [outbound, setOutbound] = useState<string>("")
  const [inbound, setInbound] = useState<string>("")

  return (
    <div className="flex">
      <div className="grid grid-cols-6 gap-4 mx-6 flex-grow">
        <div className="flex justify-center flex-col mx-2">
          <Input
            title="Date"
            key="date"
            type="date"
            value={date}
            onChange={setDate}
          />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <Select
            title="Category"
            selected={category}
            setSelected={setCategory}
            options={categories}
          />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <Select
            title="Outbound"
            selected={outbound}
            setSelected={setOutbound}
            options={accounts}
          />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <Select
            title="Inbound"
            selected={inbound}
            setSelected={setInbound}
            options={accounts}
          />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <CurrencyInput value={value} handleValueChange={setValue} />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <Select
            title="Description"
            selected={description}
            setSelected={setDescription}
            options={descriptions}
            allowCreate={true}
          />
        </div>
      </div>
      <div className="flex self-center mt-7 ml-auto mr-6">
        <button className="">
          <TrashIcon className="h-8 w-8 text-gray-400 ho"/>
        </button>
      </div>
    </div>
  );
};

export default PersonalTransferRow;
