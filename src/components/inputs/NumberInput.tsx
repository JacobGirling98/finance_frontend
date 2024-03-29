import { FC, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { isNotBlank } from "../forms/new-transaction/validation";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const NumberInput: FC<NumberInputProps> = ({ value, onChange, error }) => {
  const [innerValue, setInnerValue] = useState<string>("");

  useEffect(() => {
    setInnerValue(value === 0 ? "" : value.toString());
  }, [value]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const changedValue = e.currentTarget.value;
    if (
      changedValue === "" ||
      !changedValue.includes(".") ||
      Number(changedValue)
    ) {
      setInnerValue(changedValue);
      onChange(Number(changedValue));
    }
  };

  return (
    <>
      <label
        htmlFor="price"
        className="text-text-light dark:text-text-dark mb-1 ml-2"
      >
        Quantity
      </label>
      <input
        type="string"
        id="price"
        name="price"
        className={`rounded-md h-10 px-2 shadow-lg bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark focus:outline-none ${
          isNotBlank(error) ? "border border-red-600" : ""
        }`}
        value={innerValue}
        onChange={handleChange}
      />
      <ErrorMessage message={error} />
    </>
  );
};

export default NumberInput;
