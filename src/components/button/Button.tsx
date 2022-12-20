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
      className={`rounded-md h-10 w-24 text-base text-text-light dark:text-text-dark transition duration-150 ease-in-out mx-1 bg-special-bg-light dark:bg-special-bg-dark hover:bg-mark-light dark:hover:bg-mark-dark active:bg-mark-light dark:active:bg-mark-dark disabled:bg-black ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
