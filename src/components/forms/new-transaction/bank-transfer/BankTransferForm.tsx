import React, {FC} from "react";
import useFormControl from "../../../../hooks/useFormControl";
import {validateBankTransfer} from "../validation";
import FormButtons from "../FormButtons";
import BankTransferRow from "./BankTransferRow";
import {BankTransfer, ValidationErrors} from "../../../../types/NewMoney";
import Spinner from "../../../utils/Spinner";

const emptyBankTransfer = (date: string, category: string): BankTransfer => ({
  ...({
    category, date, description: "", quantity: 0, recipient: "", value: 0
  })
})

const emptyBankTransferErrors = (): ValidationErrors<BankTransfer> => ({
  ...({
    category: "", date: "", description: "", quantity: "", recipient: "", value: ""
  })
})

const BankTransferForm: FC = () => {
  const {
    transactions,
    validationErrors,
    addTransaction,
    clearTransactions,
    deleteRow,
    changeTransaction,
    submitTransactions,
    onlyOneRow,
    isLoading
  } = useFormControl(emptyBankTransfer, emptyBankTransferErrors(), validateBankTransfer, "bank-transfer")

  return (
    <>
      <div>
        {transactions.map((transaction, index) => (
          <BankTransferRow
            data={transactions[index]}
            index={index}
            handleDelete={deleteRow}
            isLastRow={onlyOneRow}
            handleChange={changeTransaction}
            errors={validationErrors[index]}
          />
        ))}
      </div>
      <div className="flex m-5">
        <FormButtons
          handleSubmit={submitTransactions}
          handleAddTransaction={addTransaction}
          handleClear={clearTransactions}
        />
      </div>
      <Spinner isOpen={isLoading} />
    </>
  )
}

export default BankTransferForm;