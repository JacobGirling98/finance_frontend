import React, { FC } from "react";

interface InputProps {
  title: string;
  key: string;
  type: string;
  value: string | number;
  onChange: (s: any) => void;
}

const Input: FC<InputProps> = ({
  title, key, type, value, onChange
}) => {
  return (
    <>
      <label htmlFor={`${type}-${key}`} className="text-white mb-1 ml-2">
        {title}
      </label>
      <input
        type={type}
        id={`${type}-${key}`}
        name={`${type}-${key}`}
        className="rounded-md h-10 px-2 shadow-lg bg-gray-600 text-gray-100 focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
};

export default Input;
