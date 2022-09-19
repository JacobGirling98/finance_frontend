import { FC, useState } from "react";
import CurrencyInput from "./inputs/CurrencyInput";
import Input from "./inputs/Input";
import NumberInput from "./inputs/NumberInput";
import Select from "./inputs/Select";
import { TrashIcon } from "@heroicons/react/24/solid";

const categories = ["Food", "Tech", "Gaming"];
const descriptions = ["Rent", "Game", "Book"];
const recipients = ["Mum and Dad", "Harry", "Adam"]

const BankTransferRow: FC = () => {
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
            title="Recipient"
            selected={recipient}
            setSelected={setRecipient}
            options={recipients}
          />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <CurrencyInput value={value} handleValueChange={setValue} />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <NumberInput key="quantity" value={quantity} onChange={setQuantity} />
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

export default BankTransferRow;
