import {FC} from "react";
import CurrencyInput from "./inputs/CurrencyInput";
import Input from "./inputs/Input";
import Select from "./inputs/Select";
import {Income, ValidationErrors} from "../../types/NewMoney";
import DeleteRowButton from "../button/DeleteRowButton";

const categories = ["Food", "Tech", "Gaming"];
const descriptions = ["Rent", "Game", "Book"];
const sources = ["Work"]

interface IncomeRowProps {
  data: Income
  index: number;
  handleDelete: (index: number) => void;
  isLastRow: boolean;
  handleChange: (index: number, value: string | number, field: keyof Income) => void
  errors: ValidationErrors<Income>
}

const IncomeRow: FC<IncomeRowProps> = (
  {
    data,
    index,
    handleDelete,
    isLastRow,
    handleChange,
    errors
  }
) => {
  return (
    <div className="flex">
      <div className="grid grid-cols-5 gap-4 mx-6 flex-grow">
        <div className="flex flex-col mx-2">
          <Input
            title="Date"
            key="date"
            type="date"
            value={data.date}
            onChange={(value) => handleChange(index, value, "date")}
            error={errors.date}
          />
        </div>
        <div className="flex flex-col mx-2">
          <Select
            title="Category"
            selected={data.category}
            setSelected={(value) => handleChange(index, value, "category")}
            options={categories}
            error={errors.category}
          />
        </div>
        <div className="flex flex-col mx-2">
          <Select
            title="Source"
            selected={data.source}
            setSelected={(value) => handleChange(index, value, "source")}
            options={sources}
            error={errors.source}
          />
        </div>
        <div className="flex flex-col mx-2">
          <CurrencyInput
            value={data.value}
            handleValueChange={(value) => handleChange(index, value, "value")}
            error={errors.value}
          />
        </div>
        <div className="flex flex-col mx-2">
          <Select
            title="Description"
            selected={data.description}
            setSelected={(value) => handleChange(index, value, "description")}
            options={descriptions}
            allowCreate={true}
            error={errors.description}
          />
        </div>
      </div>
      <div className="mt-8 ml-auto mr-6">
        <DeleteRowButton index={index} handleDelete={handleDelete} disabled={isLastRow}/>
      </div>
    </div>
  );
};

export default IncomeRow;
