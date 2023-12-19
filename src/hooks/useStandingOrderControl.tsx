/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { ValidationErrors } from "../types/NewMoney"
import useReferenceData from "./useReferenceData"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import { AddStandingOrder } from "../types/StandingOrders"
import { useModal } from "./useModal"
import { Entity } from "../types/Api"
import useGetStandingOrders from "./useGetStandingOrders"
import {
  changeSingleTransaction,
  hasValidationError
} from "../utils/transaction-handler"

const useStandingOrderControl = <T extends AddStandingOrder>(
  defaultStandingOrder: () => T,
  emptyError: ValidationErrors<T>,
  validate: (standingOrder: T) => ValidationErrors<T>,
  standingOrderType:
    | "credit"
    | "debit"
    | "bank-transfer"
    | "personal-transfer"
    | "income",
  onSuccess: () => void
) => {
  const [standingOrder, setStandingOrder] = useState<T>(defaultStandingOrder())
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors<T>>(emptyError)

  const { postNewDescriptions } = useReferenceData()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const queryClient = useQueryClient()

  const { refetch } = useGetStandingOrders()

  const { mutate: post, isLoading: postIsLoading } = useMutation<
    void,
    AxiosError,
    T
  >(
    "addStandingOrder",
    async (data: T) => {
      const response = await axios.post(
        `/api/standing-orders/${standingOrderType}`,
        data
      )
      return response.data
    },
    {
      onSuccess: async () => {
        toggleSuccessModal("Standing order added")
        queryClient.invalidateQueries(["getDescriptions"])
        refetch()
        onSuccess()
      },
      onError: (error) => toggleErrorModal(error.message)
    }
  )

  const { mutate: put, isLoading: putIsLoading } = useMutation<
    void,
    AxiosError,
    Entity<T>
  >(
    "updateStandingOrder",
    async (data) => {
      const response = await axios.put(
        `/api/standing-orders/${standingOrderType}`,
        data
      )
      return response.data
    },
    {
      onSuccess: async () => {
        toggleSuccessModal("Standing order updated")
        queryClient.invalidateQueries(["getDescriptions"])
        refetch()
        onSuccess()
      },
      onError: (error) => toggleErrorModal(error.message)
    }
  )

  const changeStandingOrder = (value: string | number, field: keyof T) => {
    setStandingOrder((data) => changeSingleTransaction(data, value, field))
  }

  const submitStandingOrder = () => {
    const errors: ValidationErrors<T> = validate(standingOrder)
    if (hasValidationError(errors)) {
      setValidationErrors(errors)
      return
    } else {
      setValidationErrors(emptyError)
    }
    postNewDescriptions([standingOrder.description])
    post(normaliseFrequency(standingOrder))
  }

  const updateStandingOrder = (id: string) => {
    const errors: ValidationErrors<T> = validate(standingOrder)
    if (hasValidationError(errors)) {
      setValidationErrors(errors)
      return
    } else {
      setValidationErrors(emptyError)
    }
    postNewDescriptions([standingOrder.description])
    put({ id, domain: normaliseFrequency(standingOrder) })
  }

  const normaliseFrequency = (standingOrder: T): T => {
    const unit = standingOrder.frequencyUnit == "Months" ? "MONTHLY" : "WEEKLY"
    return {
      ...standingOrder,
      frequencyUnit: unit
    }
  }

  return {
    standingOrder,
    validationErrors,
    changeStandingOrder,
    submitStandingOrder,
    isLoading: postIsLoading,
    putIsLoading,
    updateStandingOrder
  }
}

export default useStandingOrderControl
