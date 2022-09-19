import React, { FC } from "react";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  onChange
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const changedValue = e.currentTarget.value;
    if (changedValue === "" || !changedValue.includes(".") || Number(changedValue)) {
      onChange(changedValue);
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
        className="rounded-md h-10 px-2 shadow-lg bg-gray-600 text-gray-100 focus:outline-none"
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default NumberInput;
