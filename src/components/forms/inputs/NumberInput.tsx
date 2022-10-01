import React, {FC} from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: FC<NumberInputProps> = ({
                                             value,
                                             onChange
                                           }) => {
  let innerValue = value === 0 ? "" : value.toString()

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const changedValue = e.currentTarget.value;
    if (changedValue === "" || !changedValue.includes(".") || Number(changedValue)) {
      innerValue = changedValue
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
        className="rounded-md h-10 px-2 shadow-lg bg-gray-600 text-gray-100 focus:outline-none"
        value={innerValue}
        onChange={handleChange}
      />
    </>
  );
};

export default NumberInput;
