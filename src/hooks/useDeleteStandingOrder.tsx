import { useMutation, useQueryClient } from "react-query"
import { useModal } from "./useModal"
import axios, { AxiosError } from "axios"

const useDeleteStandingOrder = (onSuccess: () => void) => {
  const queryClient = useQueryClient()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const { mutate, isLoading } = useMutation<void, AxiosError, string>(
    "deleteStandingOrder",
    async (id) => {
      const response = await axios.delete(`/api/standing-orders`, {
        params: { id }
      })
      return response.data
    },
    {
      onSuccess: async () => {
        toggleSuccessModal("Standing order deleted")
        queryClient.invalidateQueries(["standingOrders"])
        onSuccess()
      },
      onError: (error) => toggleErrorModal(error.message)
    }
  )

  const deleteStandingOrder = (id: string) => mutate(id)

  return {
    deleteStandingOrder,
    isLoading
  }
}

export default useDeleteStandingOrder