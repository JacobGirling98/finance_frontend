import axios from "axios"
import { Entity } from "../types/Api"
import { StandingOrder } from "../types/StandingOrders"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const useGetStandingOrders = () => {
  const { data, refetch } = useQuery<Entity<StandingOrder>[]>({
    queryKey: ["standingOrders"],
    queryFn: async () => {
      const response = await axios.get(`/api/standing-orders`)
      return response.data
    },
    placeholderData: keepPreviousData
  })

  return { data, refetch }
}

export default useGetStandingOrders
