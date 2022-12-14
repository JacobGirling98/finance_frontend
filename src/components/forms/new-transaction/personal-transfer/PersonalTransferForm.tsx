import React, {FC} from "react";
import useFormControl from "../../../../hooks/useFormControl";
import {validatePersonalTransfer} from "../validation";
import FormButtons from "../FormButtons";
import PersonalTransferRow from "./PersonalTransferRow";
import {PersonalTransfer, ValidationErrors} from "../../../../types/NewMoney";
import Spinner from "../../../utils/Spinner";

const emptyPersonalTransfer = (date: string, category: string): PersonalTransfer => ({
  ...({
    category, date, description: "", inbound: "", outbound: "", value: 0
  })
})

const emptyPersonalTransferErrors = (): ValidationErrors<PersonalTransfer> => ({
  ...({
    category: "", date: "", description: "", inbound: "", outbound: "", value: ""
  })
})

const PersonalTransferForm: FC = () => {
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
  } = useFormControl(emptyPersonalTransfer, emptyPersonalTransferErrors(), validatePersonalTransfer, "personal-transfer")

  return (
    <>
      <div>
        {transactions.map((transaction, index) => (
          <PersonalTransferRow
            data={transactions[index]}
            index={index}
            handleDelete={deleteRow}
            isLastRow={onlyOneRow}
            handleChange={changeTransaction}
            errors={validationErrors[index]}
            focusValueInput={transactions.length > 1}
          />
        ))}
      </div>
      <div className="flex m-5">
        <FormButtons
          handleSubmit={submitTransactions}
          handleAddTransaction={addTransaction}
          handleClear={clearTransactions}
          transactionType="personal-transfer"
        />
      </div>
      <Spinner isOpen={isLoading} />
    </>
  )
}

export default PersonalTransferForm;