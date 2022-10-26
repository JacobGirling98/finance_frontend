import {useState} from "react";
import {BankTransfer, CreditDebit, Income, PersonalTransfer, ValidationErrors} from "../types/NewMoney";
import {QueryClient, useMutation} from "react-query";
import axios from "axios";
import {baseUrl} from "../utils/constants";
import useReferenceData from "./useReferenceData";

function useFormControl<T extends CreditDebit | BankTransfer | PersonalTransfer | Income>(
  emptyTransaction: (date: string, category: string) => T,
  emptyError: ValidationErrors<T>,
  validate: (transaction: T) => ValidationErrors<T>,
  transactionType: "credit" | "debit" | "bank-transfer" | "personal-transfer" | "income"
) {
  const [transactions, setTransactions] = useState<T[]>([emptyTransaction("", "")])
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<T>[]>([emptyError])

  const {postNewDescriptions} = useReferenceData()

  const queryClient = new QueryClient()

  const resetTransactions = () => setTransactions([emptyTransaction("", "")])

  const {mutate, isLoading} = useMutation<void, void, T[]>("submitTransactions", async () => {
    const response = await axios.post(`${baseUrl}/transaction/multiple/${transactionType}`, transactions)
    return response.data
  }, {
    onSuccess: () => {
      resetTransactions()
      queryClient.invalidateQueries("getDescriptions")
    }
  })

  const addTransaction = () => {
    setTransactions(state => [...state, emptyTransaction(
      latestDate(state),
      latestCategory(state)
    )])
    setValidationErrors(state => [...state, emptyError])
  }

  const clearTransactions = () => {
    resetTransactions()
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
    } else {
      setValidationErrors(transactions.map(() => emptyError))
    }
    postNewDescriptions(transactions.map(t => t.description))
    mutate(transactions)
  }

  const latestDate = (transactions: T[]): string => transactions[transactions.length - 1].date

  const latestCategory = (transactions: T[]): string => transactions[transactions.length - 1].category

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
    submitTransactions,
    isLoading
  })
}

export default useFormControl;