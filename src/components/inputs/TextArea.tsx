import React, { FC } from "react";

interface TextAreaProps {
  onChange: (content: string) => void;
}

const TextArea: FC<TextAreaProps> = (
  {
    onChange
  }
) => {
  return (
    <>
      <textarea
        className={`rounded-md p-2 bg-input-primary-dark w-full text-secondary-dark-main focus:outline-none shadow-lg`}
        placeholder="Enter receipt contents here..."
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  )
}

export default TextArea;