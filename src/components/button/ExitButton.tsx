import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ExitButtonProps {
  className?: string;
  onClick: () => void;
}

const ExitButton: FC<ExitButtonProps> = ({ className = "", onClick }) => {
  return (
    <button
      className={`text-text-light dark:text-text-dark hover:text-subtle-light dark:hover:text-subtle-dark active:text-mark-light dark:active:text-mark-dark ${className}`}
      onClick={onClick}
    >
      <XMarkIcon className="h-6 w-6" />
    </button>
  );
};

export default ExitButton;
