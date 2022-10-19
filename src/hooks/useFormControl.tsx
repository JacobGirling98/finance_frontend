import {useState} from "react";
import {ValidationErrors} from "../types/NewMoney";
import {useMutation} from "react-query";
import axios from "axios";
import {baseUrl} from "../utils/constants";

function useFormControl<T>(
  emptyTransaction: T,
  emptyError: ValidationErrors<T>,
  validate: (transaction: T) => ValidationErrors<T>,
  transactionType: "credit" | "debit" | "bank-transfer" | "personal-transfer" | "income"
) {
  const [transactions, setTransactions] = useState<T[]>([emptyTransaction])
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<T>[]>([emptyError])

  const {mutate} = useMutation<void, void, T[]>("submitTransactions", async () => {
    const response = await axios.post(`${baseUrl}/transaction/multiple/${transactionType}`, transactions)
    return response.data
  })

  const addTransaction = () => {
    setTransactions(state => [...state, emptyTransaction])
    setValidationErrors(state => [...state, emptyError])
  }

  const clearTransactions = () => {
    setTransactions([emptyTransaction])
    setValidationErrors([emptyError])
  }

  const deleteRow = (index: number) => {
    setTransactions(state => state.filter((_, i) => i !== index))
    setValidationErrors(state => state.filter((_, i) => i !== index))
  }

  const changeTransaction = (index: number, value: string | number, field: keyof T) => {
    setTransactions(state => state.map((transaction, i) => {
      return i === index ? {
        ...transaction,
        [field]: (typeof value === "number" && isNaN(value) ? 0 : value)
      } : transaction;
    }))
  }

  const submitTransactions = () => {
    const errors: ValidationErrors<T>[] = transactions.map(transaction => validate(transaction))
    if (containsValidationError(errors)) {
      setValidationErrors(errors)
      return
    }
    mutate(transactions)
  }

  const containsValidationError = (errors: ValidationErrors<T>[]): boolean => errors.flatMap(error => Object.entries(error).map(([_, value]) => value !== "")).includes(true)

  const onlyOneRow = transactions.length === 1

  return ({
    transactions,
    validationErrors,
    addTransaction,
    clearTransactions,
    deleteRow,
    changeTransaction,
    onlyOneRow,
    submitTransactions
  })
}

export default useFormControl;