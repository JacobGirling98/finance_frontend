import {FC} from "react";
import CurrencyInput from "./inputs/CurrencyInput";
import Input from "./inputs/Input";
import NumberInput from "./inputs/NumberInput";
import Select from "./inputs/Select";
import DeleteRowButton from "../button/DeleteRowButton";
import {CreditDebit} from "../../types/NewMoney";

const categories = ["Food", "Tech", "Gaming"];
const descriptions = ["Rent", "Game", "Book"];

interface CreditDebitRowProps {
  data: CreditDebit
  index: number;
  handleDelete: (index: number) => void;
  isLastRow: boolean;
  handleChange: (index: number, value: string | number, field: keyof CreditDebit) => void
}

const CreditDebitRow: FC<CreditDebitRowProps> = (
  {
    data, index, handleDelete, isLastRow, handleChange
  }
) => {
  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-4 mx-6 flex-grow">
        <div className="flex justify-center flex-col mx-2">
          <Input
            title="Date"
            key="date"
            type="date"
            value={data.date}
            onChange={(value) => handleChange(index, value, "date")}
          />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <Select
            title="Category"
            selected={data.category}
            setSelected={value => handleChange(index, value, "category")}
            options={categories}
          />
        </div>
        <div className="flex justify-center flex-col mx-2">
          <CurrencyInput value={data.value} handleValueChange={value => handleChange(index, value, "value")}/>
        </div>
        <div className="flex justify-center flex-col mx-2">
          <NumberInput key="quantity" value={data.quantity} onChange={value => handleChange(index, value, "quantity")}/>
        </div>
        <div className="flex justify-center flex-col mx-2">
          <Select
            title="Description"
            selected={data.description}
            setSelected={value => handleChange(index, value, "description")}
            options={descriptions}
            allowCreate={true}
          />
        </div>
      </div>
      <div className="flex self-center mt-7 ml-auto mr-6">
        <DeleteRowButton index={index} handleDelete={handleDelete} disabled={isLastRow}/>
      </div>
    </div>
  );
};

export default CreditDebitRow;
