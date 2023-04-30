import { FC } from "react";

interface FormButtonProps {
  value: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<FormButtonProps> = ({
  value,
  className,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`rounded-md h-10 w-24 text-base
        text-special-text-light dark:text-special-text-dark
        bg-special-light dark:bg-special-dark
        hover:bg-special-hover-light dark:hover:bg-special-hover-dark
        active:bg-special-active-light dark:active:bg-special-active-dark
        disabled:bg-disabled-light dark:disabled:bg-disabled-dark
        transition duration-150 ease-in-out mx-1  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
