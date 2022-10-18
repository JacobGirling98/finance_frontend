import React, {FC, useState} from "react";
import {CreditDebit, Transaction, TransactionType, ValidationErrors} from "../../../types/NewMoney";
import {emptyCreditDebit, emptyCreditDebitErrors} from "../../../utils/defaults";

interface CreditDebitFormProps {
  transactionType: TransactionType.CREDIT | TransactionType.DEBIT;

}

function handleAddTransaction<T>(
  setTransactions: React.Dispatch<React.SetStateAction<T[]>>,
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors<T>[]>>,
  emptyTransaction: T,
  emptyError: ValidationErrors<T>
) {
  setTransactions(state => [...state, emptyTransaction])
  setValidationErrors(state => [...state, emptyError])
}

function handleClearTransaction<T>(
  setTransactions: React.Dispatch<React.SetStateAction<T[]>>,
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors<T>[]>>,
  emptyTransaction: T,
  emptyError: ValidationErrors<T>
) {
  setTransactions([emptyTransaction])
  setValidationErrors([emptyError])
}

const CreditDebitForm: FC<CreditDebitFormProps> = (
  {
    transactionType
  }
) => {

  const [transactions, setTransactions] = useState<CreditDebit[]>([emptyCreditDebit()])
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<CreditDebit>[]>([emptyCreditDebitErrors()])

  const handleAdd = () => handleAddTransaction(
    setTransactions,
    setValidationErrors,
    emptyCreditDebit(),
    emptyCreditDebitErrors()
  )

  return (
    <p>Hello</p>
  )
}

export default CreditDebitForm