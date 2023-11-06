/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import {
  ValidationErrors
} from "../types/NewMoney"
import { changeSingleTransaction } from "../components/forms/new-transaction/changeTransaction"
import useReferenceData from "./useReferenceData"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import { AddStandingOrder } from "../types/StandingOrders"
import { useModal } from "./useModal"
import { Entity } from "../types/Api"


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
  const [standingOrder, setStandingOrder] = useState<T>(
    defaultStandingOrder()
  )
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors<T>>(emptyError)

  const { postNewDescriptions } = useReferenceData()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const queryClient = useQueryClient()

  const { mutate: post, isLoading: postIsLoading } = useMutation<void, AxiosError, T>(
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
        toggleSuccessModal("Standing order added"),
          queryClient.invalidateQueries(["getDescriptions"])
        onSuccess()
      },
      onError: (error) => toggleErrorModal(error.message)
    }
  )

  const { mutate: put, isLoading: putIsLoading } = useMutation<void, AxiosError, Entity<T>>(
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
        toggleSuccessModal("Standing order updated"),
          queryClient.invalidateQueries(["getDescriptions"])
          queryClient.invalidateQueries(["standingOrders"])
        onSuccess()
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
    post(normaliseFrequency(standingOrder))
  }

  const updateStandingOrder = (id: string) => {
    const errors: ValidationErrors<T> = validate(standingOrder)
    if (containsValidationError(errors)) {
      setValidationErrors(errors)
      return
    } else {
      setValidationErrors(emptyError)
    }
    postNewDescriptions([standingOrder.description])
    put({id, domain: normaliseFrequency(standingOrder)})
  }

  const containsValidationError = (errors: ValidationErrors<T>): boolean =>
    Object.entries(errors)
      .map(([_, value]) => value !== "")
      .includes(true)

  const normaliseFrequency = (standingOrder: T): T => {
    const unit = standingOrder.frequencyUnit == "Months" ? "MONTHLY" : "WEEKLY"
    return ({
      ...standingOrder,
      frequencyUnit: unit
    })
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
