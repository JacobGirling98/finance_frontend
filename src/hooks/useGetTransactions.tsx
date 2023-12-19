import axios from "axios"
import { useQuery } from "react-query"
import { Page } from "../types/Api"
import { Transaction } from "../types/ViewMoney"

const useGetTransactions = (
  searchTerm: string,
  page: number,
  pageSize: number
) => {
  const { data, refetch } = useQuery<Page<Transaction>>(
    ["transactions", searchTerm, page, pageSize],
    async () => {
      const response = await axios.get("/api/transaction/search", {
        params: {
          pageNumber: page,
          pageSize: pageSize,
          value: searchTerm
        }
      })
      return response.data
    },
    {
      enabled: searchTerm !== "",
      keepPreviousData: true
    }
  )

  return {
    data,
    refetch
  }
}

export default useGetTransactions
