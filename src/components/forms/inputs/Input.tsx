import React, {FC} from "react";
import ErrorMessage from "./ErrorMessage";
import {isNotBlank} from "../../../utils/validation";

interface InputProps {
  title: string;
  type: string;
  value: string | number;
  onChange: (s: any) => void;
  error?: string;
}

const Input: FC<InputProps> = (
  {
    title, type, value, onChange, error
  }) => {
  return (
    <>
      <label htmlFor={`${type}`} className="text-white mb-1 ml-2">
        {title}
      </label>
      <input
        type={type}
        id={`${type}`}
        name={`${type}`}
        className={`rounded-md h-10 px-2 shadow-lg bg-gray-600 text-gray-100 focus:outline-none ${isNotBlank(error) ? "border border-red-600" : ""}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <ErrorMessage message={error}/>
    </>
  );
};

export default Input;
