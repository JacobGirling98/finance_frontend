import React, {FC} from "react";
import FormButton from "../../button/FormButton";

interface FormButtonsProps {
  handleSubmit: () => void;
  handleAddTransaction: () => void;
  handleClear: () => void;
}

const FormButtons: FC<FormButtonsProps> = (
  {
    handleSubmit, handleAddTransaction, handleClear
  }
) => {
  return (
    <>
      <FormButton
        value="Submit"
        className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-600 ring-indigo-800"
        onClick={handleSubmit}
      />
      <FormButton
        value="Add Row"
        className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 ring-indigo-800"
        onClick={handleAddTransaction}
      />
      <FormButton
        value="Clear"
        onClick={handleClear}
        className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 ring-indigo-800"
      />
      <FormButton
        value="Upload Receipt"
        onClick={handleAddTransaction}
        className="w-32 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 ring-indigo-800"
      />
    </>
  )
}

export default FormButtons;