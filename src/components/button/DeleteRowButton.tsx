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
        className="h-8 w-8 text-gray-400 group-disabled:text-gray-700 hover:text-gray-300 active:text-gray-200 hover:transition active:transition duration-150 ease-in-out"
      />
    </button>
  )
}

export default DeleteRowButton;