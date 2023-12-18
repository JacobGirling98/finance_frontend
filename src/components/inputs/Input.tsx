import { FC, HTMLInputTypeAttribute } from "react"
import ErrorMessage from "./ErrorMessage"
import { isNotBlank } from "../forms/new-transaction/validation"

interface InputProps {
  title?: string
  type: HTMLInputTypeAttribute
  value: string | number
  onChange: (s: any) => void
  error?: string
  className?: string
}

const Input: FC<InputProps> = ({
  title,
  type,
  value,
  onChange,
  error,
  className = ""
}) => {
  return (
    <>
      {title && (
        <label
          htmlFor={`${type}`}
          className="text-text-light dark:text-text-dark mb-1 mx-2"
        >
          {title}
        </label>
      )}
      <input
        type={type}
        id={`${type}`}
        name={`${type}`}
        className={`rounded-md h-10 px-2 shadow-lg bg-input-light dark:bg-input-dark text-text-light dark:text-text-dark focus:outline-none ${
          isNotBlank(error) ? "border border-red-600" : ""
        } ${className}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <ErrorMessage message={error} />
    </>
  )
}

export default Input
