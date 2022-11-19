import React, {FC} from "react";

interface FormButtonProps {
  value: string;
  className?: string;
  onClick?: () => void;
}

const Button: FC<FormButtonProps> = (
  {
    value, className, onClick
  }
) => {
  return (
    <button
      className={`rounded-md h-10 w-24 text-base text-secondary-dark-main transition duration-150 ease-in-out mx-1 bg-primary-dark-main hover:bg-primary-dark-hover active:bg-primary-dark-active ${className}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
