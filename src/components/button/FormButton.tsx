import React, {FC} from "react";

interface FormButtonProps {
  value: string;
  className?: string;
  onClick: () => void;
}

const FormButton: FC<FormButtonProps> = (
  {
    value, className, onClick
  }
) => {
  return (
    <button
      className={`rounded-md h-10 w-24 text-base text-white transition duration-150 ease-in-out mx-1 ${className} ring-1 shadow-md`}
      onClick={() => onClick()}
    >
      {value}
    </button>
  );
};

export default FormButton;
