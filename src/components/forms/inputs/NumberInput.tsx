import React, {FC, useEffect, useState} from "react";
import ErrorMessage from "./ErrorMessage";
import {isNotBlank} from "../../../utils/validation";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const NumberInput: FC<NumberInputProps> = (
  {
    value,
    onChange,
    error
  }) => {
  let [innerValue, setInnerValue] = useState<string>("")

  useEffect(() => {
    setInnerValue(value.toString())
  }, [value])

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const changedValue = e.currentTarget.value;
    if (changedValue === "" || !changedValue.includes(".") || Number(changedValue)) {
      setInnerValue(changedValue)
      onChange(Number(changedValue));
    }
  };

  return (
    <>
      <label htmlFor="price" className="text-white mb-1 ml-2">
        Quantity
      </label>
      <input
        type="string"
        id="price"
        name="price"
        className={`rounded-md h-10 px-2 shadow-lg bg-gray-600 text-gray-100 focus:outline-none ${isNotBlank(error) ? "border border-red-600" : ""}`}
        value={innerValue}
        onChange={handleChange}
      />
      <ErrorMessage message={error}/>
    </>
  );
};

export default NumberInput;
