import { useMutation, useQueryClient } from "react-query"
import { useModal } from "./useModal"
import axios, { AxiosError } from "axios"

const useDeleteTransaction = (onSuccess: () => void) => {
  const queryClient = useQueryClient()
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const { mutate, isLoading } = useMutation<void, AxiosError, string>(
    "deleteTransaction",
    async (id) => {
      const response = await axios.delete(`/api/transaction`, {
        params: { id }
      })
      return response.data
    },
    {
      onSuccess: async () => {
        toggleSuccessModal("Transaction deleted")
        queryClient.invalidateQueries(["transactions"])
        onSuccess()
      },
      onError: (error) => toggleErrorModal(error.message)
    }
  )

  const deleteTransaction = (id: string) => mutate(id)

  return {
    deleteTransaction,
    isLoading
  }
}

export default useDeleteTransaction
