import { FC, useState } from "react";
import DatePicker from "./DatePicker";
import Select from "./Select";

const categories = ["Food", "Tech", "Gaming"];

const CreditRow: FC = () => {
  const [category, setCategory] = useState<string>("");

  return (
    <div className="grid grid-cols-5 gap-4 mx-6">
      <div className="flex justify-center flex-col mx-2">
        <DatePicker />
      </div>
      <div className="flex justify-center flex-col mx-2">
        <Select selected={category} setSelected={setCategory} options={categories}/>
      </div>
      <div>Price</div>
      <div>Quantity</div>
      <div>Description</div>
    </div>
  );
};

export default CreditRow;
