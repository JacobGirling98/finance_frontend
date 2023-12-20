import { useState } from "react"
import { Transaction, ValidationErrors } from "../types/NewMoney"
import useReferenceData from "./useReferenceData"
import { useModal } from "./useModal"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import { Entity } from "../types/Api"
import {
  changeSingleTransaction,
  hasValidationError
} from "../utils/transaction-handler"
import useGetTransactions from "./useGetTransactions"

const useTransactionControl = <T extends Transaction>(
  defaultTransaction: () => T,
  emptyError: ValidationErrors<T>,
  validate: (transaction: T) => ValidationErrors<T>,
  transactionType:
    | "credit"
    | "debit"
    | "bank-transfer"
    | "personal-transfer"
    | "income",
  onSuccess: () => void
) => {
  const [transaction, setTransaction] = useState<T>(defaultTransaction())
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors<T>>(emptyError)

  const { postNewDescriptions } = useReferenceData()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const queryClient = useQueryClient()

  const { refetch } = useGetTransactions("", 1, 20)

  const { mutate: put, isLoading: putIsLoading } = useMutation<
    void,
    AxiosError,
    Entity<T>
  >(
    "updateTransaction",
    async (data) => {
      const response = await axios.put(
        `/api/transaction/${transactionType}`,
        data,
        {
          headers: { user: "Jacob" }
        }
      )
      return response.data
    },
    {
      onSuccess: async () => {
        toggleSuccessModal("Transaction updated")
        queryClient.invalidateQueries(["getDescriptions", "transactions"])
        refetch()
        onSuccess()
      },
      onError: (error) => toggleErrorModal(error.message)
    }
  )

  const changeTransaction = (value: string | number, field: keyof T) => {
    setTransaction((data) => changeSingleTransaction(data, value, field))
  }

  const updateTransaction = (id: string) => {
    const errors: ValidationErrors<T> = validate(transaction)
    if (hasValidationError(errors)) {
      setValidationErrors(errors)
      return
    } else {
      setValidationErrors(emptyError)
    }
    postNewDescriptions([transaction.description])
    put({ id, domain: transaction })
  }

  return {
    transaction,
    validationErrors,
    changeTransaction,
    putIsLoading,
    updateTransaction
  }
}

export default useTransactionControl
