import React, {FC} from "react";
import {TrashIcon} from "@heroicons/react/24/solid";

interface DeleteRowButtonProps {
  index: number;
  handleDelete: (index: number) => void;
  disabled: boolean;
}

const DeleteRowButton: FC<DeleteRowButtonProps> = (
  {
    index, handleDelete, disabled
  }
) => {
  return (
    <button onClick={() => handleDelete(index)} className="group" disabled={disabled}>
      <TrashIcon
        className="h-8 w-8
          text-gray-500
          hover:text-gray-400
          active:text-gray-300
          group-disabled:text-disabled-light dark:group-disabled:text-disabled-dark
          hover:transition active:transition duration-150 ease-in-out"
      />
    </button>
  )
}

export default DeleteRowButton;