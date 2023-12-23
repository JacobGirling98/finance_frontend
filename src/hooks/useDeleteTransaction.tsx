import { useModal } from "./useModal"
import axios, { AxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeleteTransaction = (onSuccess: () => void) => {
  const queryClient = useQueryClient()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const { mutate, isPending } = useMutation<void, AxiosError, string>({
    mutationKey: ["deleteTransaction"],
    mutationFn: async (id) => {
      const response = await axios.delete(`/api/transaction`, {
        params: { id }
      })
      return response.data
    },

    onSuccess: async () => {
      toggleSuccessModal("Transaction deleted")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      onSuccess()
    },
    onError: (error) => toggleErrorModal(error.message)
  })

  const deleteTransaction = (id: string) => mutate(id)

  return {
    deleteTransaction,
    isLoading: isPending
  }
}

export default useDeleteTransaction
