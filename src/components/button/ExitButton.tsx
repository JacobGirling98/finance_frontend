import React, { FC } from "react";
import {XMarkIcon} from "@heroicons/react/24/solid";

interface ExitButtonProps {
  className?: string;
  onClick: () => void;
}

const ExitButton: FC<ExitButtonProps> = (
  {
    className = "",
    onClick
  }
) => {
  return (
    <button
      className={`text-text-primary-dark-main hover:text-text-primary-dark-hover active:text-text-primary-dark-active ${className}`}
      onClick={onClick}
    >
      <XMarkIcon className="h-6 w-6"/>
    </button>
  )
}

export default ExitButton;