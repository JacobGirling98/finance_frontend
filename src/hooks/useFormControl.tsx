import { useState } from "react"
import {
  Transaction,
  TransactionConfirmation,
  ValidationErrors
} from "../types/NewMoney"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import { BASE_URL, today } from "../utils/constants"
import useReferenceData from "./useReferenceData"
import { changeSingleTransaction } from "../components/forms/new-transaction/changeTransaction"
import { useModal } from "./useModal"

function useFormControl<T extends Transaction>(
  emptyTransaction: (date: string, category: string) => T,
  emptyError: ValidationErrors<T>,
  validate: (transaction: T) => ValidationErrors<T>,
  transactionType:
    | "credit"
    | "debit"
    | "bank-transfer"
    | "personal-transfer"
    | "income"
) {
  const [transactions, setTransactions] = useState<T[]>([
    emptyTransaction(today, "")
  ])
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrors<T>[]
  >([emptyError])

  const { postNewDescriptions } = useReferenceData()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const queryClient = useQueryClient()

  const resetTransactions = () => setTransactions([emptyTransaction(today, "")])

  const { mutate, isLoading } = useMutation<
    TransactionConfirmation,
    AxiosError,
    T[]
  >(
    "submitTransactions",
    async () => {
      const response = await axios.post(
        `${BASE_URL}/transaction/multiple/${transactionType}`,
        transactions
      )
      return response.data
    },
    {
      onSuccess: async (data) => {
        resetTransactions()
        toggleSuccessModal(
          `Added ${
            data.transactionCount
          } transactions worth £${data.value.toFixed(2)}`
        )
        queryClient.invalidateQueries(["getDescriptions"])
      },
      onError: (error) => {
        toggleErrorModal(error.message)
      }
    }
  )

  const addTransaction = () => {
    setTransactions((state) => [
      ...state,
      emptyTransaction(latestDate(state), latestCategory(state))
    ])
    setValidationErrors((state) => [...state, emptyError])
  }

  const clearTransactions = () => {
    resetTransactions()
    setValidationErrors([emptyError])
  }

  const deleteRow = (index: number) => {
    setTransactions((state) => state.filter((_, i) => i !== index))
    setValidationErrors((state) => state.filter((_, i) => i !== index))
  }

  const changeTransaction = (
    index: number,
    value: string | number,
    field: keyof T
  ) => {
    setTransactions((state) =>
      state.map((transaction, i) => {
        return i === index
          ? changeSingleTransaction(transaction, value, field)
          : transaction
      })
    )
  }

  const submitTransactions = () => {
    const errors: ValidationErrors<T>[] = transactions.map((transaction) =>
      validate(transaction)
    )
    if (containsValidationError(errors)) {
      setValidationErrors(errors)
      return
    } else {
      setValidationErrors(transactions.map(() => emptyError))
    }
    postNewDescriptions(transactions.map((t) => t.description))
    mutate(transactions)
  }

  const overrideTransactions = (transactions: T[]) => {
    setTransactions(transactions)
    setValidationErrors(transactions.map(() => emptyError))
  }

  const latestDate = (transactions: T[]): string =>
    transactions[transactions.length - 1].date

  const latestCategory = (transactions: T[]): string =>
    transactions[transactions.length - 1].category

  const containsValidationError = (errors: ValidationErrors<T>[]): boolean =>
    errors
      .flatMap((error) =>
        Object.entries(error).map(([_, value]) => value !== "")
      )
      .includes(true)

  const onlyOneRow = transactions.length === 1

  return {
    transactions,
    validationErrors,
    addTransaction,
    clearTransactions,
    deleteRow,
    changeTransaction,
    onlyOneRow,
    submitTransactions,
    overrideTransactions,
    isLoading
  }
}

export default useFormControl
