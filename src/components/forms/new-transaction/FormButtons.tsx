import { FC, useEffect } from "react";
import Button from "../../button/Button";

interface FormButtonsProps {
  handleSubmit: () => void;
  handleAddTransaction: () => void;
  handleClear: () => void;
  handleUploadReceipt?: () => void;
  transactionType:
    | "credit"
    | "debit"
    | "bank-transfer"
    | "personal-transfer"
    | "income";
}

const FormButtons: FC<FormButtonsProps> = ({
  handleSubmit,
  handleAddTransaction,
  handleClear,
  handleUploadReceipt,
  transactionType,
}) => {
  useEffect(() => {
    const keydownAddRow = (event: KeyboardEvent) => {
      if (event.altKey && event.code === "KeyN") {
        handleAddTransaction();
      }
    };
    const keydownClearRows = (event: KeyboardEvent) => {
      if (event.altKey && event.code === "KeyC") {
        handleClear();
      }
    };
    window.addEventListener("keydown", keydownAddRow);
    window.addEventListener("keydown", keydownClearRows);
    return () => {
      window.removeEventListener("keydown", keydownAddRow);
      window.removeEventListener("keydown", keydownClearRows);
    };
  }, [handleAddTransaction, handleClear]);

  return (
    <>
      <Button value="Submit" onClick={handleSubmit} />
      <Button value="Add Row" onClick={handleAddTransaction} />
      <Button value="Clear" onClick={handleClear} />
      <Button
        value="Upload Receipt"
        onClick={handleUploadReceipt}
        className="w-32"
        disabled={
          !(transactionType === "credit" || transactionType === "debit")
        }
      />
    </>
  );
};

export default FormButtons;
