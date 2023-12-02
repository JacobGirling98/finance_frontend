import { FC } from "react";
import { ChildrenProps } from "../../types/ChildrenProps";

interface FormButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<FormButtonProps & ChildrenProps> = ({
  children,
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
      {children}
    </button>
  );
};

export default Button;
