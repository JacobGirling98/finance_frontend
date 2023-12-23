import { useModal } from "./useModal"
import axios, { AxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeleteStandingOrder = (onSuccess: () => void) => {
  const queryClient = useQueryClient()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const { mutate, isPending } = useMutation<void, AxiosError, string>({
    mutationKey: ["deleteStandingOrder"],
    mutationFn: async (id) => {
      const response = await axios.delete(`/api/standing-orders`, {
        params: { id }
      })
      return response.data
    },
    onSuccess: async () => {
      toggleSuccessModal("Standing order deleted")
      queryClient.invalidateQueries({ queryKey: ["standingOrders"] })
      onSuccess()
    },
    onError: (error) => toggleErrorModal(error.message)
  })

  const deleteStandingOrder = (id: string) => mutate(id)

  return {
    deleteStandingOrder,
    isLoading: isPending
  }
}

export default useDeleteStandingOrder
