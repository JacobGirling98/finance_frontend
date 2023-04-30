import { FC } from "react";

interface TextAreaProps {
  onChange: (content: string) => void;
}

const TextArea: FC<TextAreaProps> = ({ onChange }) => {
  return (
    <>
      <textarea
        className={`rounded-md p-2 bg-input-light dark:bg-input-dark w-full text-text-light dark:text-text-dark focus:outline-none shadow-lg`}
        placeholder="Enter receipt contents here..."
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default TextArea;
