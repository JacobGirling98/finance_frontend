import React from "react";

interface CurrencyCmpProps {
  value: string;
  handleValueChange: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyCmpProps> = ({
  value,
  handleValueChange,
}) => {
  const decimalValidator: RegExp = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let changedValue = e.currentTarget.value;
    if (
      (changedValue.split(".").length === 1 ||
        changedValue.split(".")[1].length <= 2) &&
      (decimalValidator.test(changedValue) || changedValue === "")
    ) {
      handleValueChange(changedValue);
    }
  };

  return (
    <>
      <label htmlFor="price" className="text-white mb-1 ml-2">
        Price
      </label>
      <div className="relative rounded-md shadow-lg">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-300 sm:text-sm">£</span>
        </div>
        <input
          id="value"
          className="block w-full h-10 rounded-md pl-7 pr-12 bg-gray-600 text-gray-100 overflow-hidden focus:outline-none"
          type="text"
          value={value}
          onChange={e => handleChange(e)}
        />
      </div>
    </>
  );
};

export default CurrencyInput;
