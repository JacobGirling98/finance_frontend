import React, {FC} from "react";

interface FormButtonProps {
  value: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean
}

const Button: FC<FormButtonProps> = (
  {
    value,
    className,
    onClick,
    disabled = false
  }
) => {
  return (
    <button
      className={`rounded-md h-10 w-24 text-base text-secondary-dark-main transition duration-150 ease-in-out mx-1 bg-primary-dark-main hover:bg-primary-dark-hover active:bg-primary-dark-active disabled:bg-primary-dark-disabled ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
