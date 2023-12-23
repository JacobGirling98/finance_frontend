import axios from "axios"
import { Page } from "../types/Api"
import { Transaction } from "../types/ViewMoney"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const useGetTransactions = (
  searchTerm: string,
  page: number,
  pageSize: number
) => {
  const { data, refetch } = useQuery<Page<Transaction>>({
    queryKey: ["transactions", searchTerm, page, pageSize],
    queryFn: async () => {
      const response = await axios.get("/api/transaction/search", {
        params: {
          pageNumber: page,
          pageSize: pageSize,
          value: searchTerm
        }
      })
      return response.data
    },
    enabled: searchTerm !== "",
    placeholderData: keepPreviousData
  })

  return {
    data,
    refetch
  }
}

export default useGetTransactions
