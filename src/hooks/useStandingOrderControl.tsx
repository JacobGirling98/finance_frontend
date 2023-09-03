import { useState } from "react"
import {
  ValidationErrors
} from "../types/NewMoney"
import { BASE_URL, today } from "../utils/constants"
import { changeSingleTransaction } from "../components/forms/new-transaction/changeTransaction"
import useReferenceData from "./useReferenceData"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import { AddStandingOrder } from "../types/StandingOrders"
import { useModal } from "./useModal"


const useStandingOrderControl = <T extends AddStandingOrder>(
  emptyStandingOrder: (date: string, category: string) => T,
  emptyError: ValidationErrors<T>,
  validate: (standingOrder: T) => ValidationErrors<T>,
  standingOrderType:
    | "credit"
    | "debit"
    | "bank-transfer"
    | "personal-transfer"
    | "income"
) => {
  const [standingOrder, setStandingOrder] = useState<T>(
    emptyStandingOrder(today, "")
  )
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors<T>>(emptyError)

  const { postNewDescriptions } = useReferenceData()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation<void, AxiosError, T>(
    "addStandingOrder",
    async () => {
      const response = await axios.post(
        `${BASE_URL}/standing-order/${standingOrderType}`,
        standingOrder
      )
      return response.data
    },
    {
      onSuccess: async () => {
        toggleSuccessModal("Standing order added"),
          queryClient.invalidateQueries(["getDescriptions"])
      },
      onError: (error) => toggleErrorModal(error.message)
    }
  )

  const changeStandingOrder = (
    value: string | number,
    field: keyof T
  ) => {
    setStandingOrder((data) => changeSingleTransaction(data, value, field))
  }

  const submitStandingOrder = () => {
    const errors: ValidationErrors<T> = validate(standingOrder)
    if (containsValidationError(errors)) {
      setValidationErrors(errors)
      return
    } else {
      setValidationErrors(emptyError)
    }
    postNewDescriptions([standingOrder.description])
    mutate(standingOrder)
  }

  const containsValidationError = (errors: ValidationErrors<T>): boolean =>
    Object.entries(errors)
      .map(([_, value]) => value !== "")
      .includes(true)

  return {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder,
    isLoading
  }
}

export default useStandingOrderControl
