import React, {useEffect, useState} from "react";
import ErrorMessage from "./ErrorMessage";
import {isNotBlank} from "../forms/new-transaction/validation";

interface CurrencyInputProps {
  value: number;
  handleValueChange: (value: number) => void;
  error?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({
     value,
     handleValueChange,
     error
   }, ref) => {
    const [innerValue, setInnerValue] = useState<string>("")

    useEffect(() => {
      setInnerValue(value === 0 ? "" : value.toString())
    }, [value])

    const decimalValidator: RegExp = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
      let changedValue = e.currentTarget.value;
      if (
        (changedValue.split(".").length === 1 ||
          changedValue.split(".")[1].length <= 2) &&
        (decimalValidator.test(changedValue) || changedValue === "")
      ) {
        setInnerValue(changedValue)
        handleValueChange(parseFloat(changedValue));
      }
    };

    return (
      <>
        <label htmlFor="price" className="text-text-light dark:text-text-dark mb-1 ml-2">
          Value
        </label>
        <div className={`relative rounded-md shadow-lg ${isNotBlank(error) ? "border border-red-600" : ""}`}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-text-light dark:text-text-dark sm:text-sm">£</span>
          </div>
          <input
            id="value"
            className="block w-full h-10 rounded-md pl-7 pr-12 bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark overflow-hidden focus:outline-none"
            type="text"
            value={innerValue}
            onChange={e => handleChange(e)}
            ref={ref}
          />
        </div>
        <ErrorMessage message={error}/>
      </>
    )
  }
)

export default CurrencyInput;
