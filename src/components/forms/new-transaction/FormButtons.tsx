import { FC, useEffect } from "react"
import Button from "../../button/Button"

interface FormButtonsProps {
  handleSubmit: () => void
  handleAddTransaction: () => void
  handleClear: () => void
  handleUploadReceipt?: () => void
  transactionType:
    | "credit"
    | "debit"
    | "bank-transfer"
    | "personal-transfer"
    | "income"
}

const FormButtons: FC<FormButtonsProps> = ({
  handleSubmit,
  handleAddTransaction,
  handleClear,
  handleUploadReceipt,
  transactionType
}) => {
  useEffect(() => {
    const keydownAddRow = (event: KeyboardEvent) => {
      if (event.altKey && event.code === "KeyN") {
        handleAddTransaction()
      }
    }
    const keydownClearRows = (event: KeyboardEvent) => {
      if (event.altKey && event.code === "KeyC") {
        handleClear()
      }
    }
    window.addEventListener("keydown", keydownAddRow)
    window.addEventListener("keydown", keydownClearRows)
    return () => {
      window.removeEventListener("keydown", keydownAddRow)
      window.removeEventListener("keydown", keydownClearRows)
    }
  }, [handleAddTransaction, handleClear])

  return (
    <>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleAddTransaction}>Add Row</Button>
      <Button onClick={handleClear}>Clear</Button>
      <Button
        onClick={handleUploadReceipt}
        className="w-32"
        disabled={
          !(transactionType === "credit" || transactionType === "debit")
        }
      >
        Upload Receipt
      </Button>
    </>
  )
}

export default FormButtons
