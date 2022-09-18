import { FC, useState } from "react";
import CurrencyInput from "./CurrencyInput";
import Input from "./Input";
import NumberInput from "./NumberInput";
import Select from "./Select";

const categories = ["Food", "Tech", "Gaming"];

const CreditRow: FC = () => {
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  return (
    <div className="grid grid-cols-5 gap-4 mx-6">
      <div className="flex justify-center flex-col mx-2">
        <Input title="Date" key="date" type="date" value={date} onChange={setDate}/>
      </div>
      <div className="flex justify-center flex-col mx-2">
        <Select selected={category} setSelected={setCategory} options={categories}/>
      </div>
      <div className="flex justify-center flex-col mx-2">
        <CurrencyInput value={value} handleValueChange={setValue}/>
      </div>
      <div className="flex justify-center flex-col mx-2">
        <NumberInput key="quantity" value={quantity} onChange={setQuantity} />
      </div>
      <div>Description</div>
    </div>
  );
};

export default CreditRow;
