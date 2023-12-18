import axios from "axios"
import { useQuery } from "react-query"
import { Entity } from "../types/Api"
import { StandingOrder } from "../types/StandingOrders"

const useGetStandingOrders = () => {
  const { data, refetch } = useQuery<Entity<StandingOrder>[]>(
    "standingOrders",
    async () => {
      const response = await axios.get(`/api/standing-orders`)
      return response.data
    },
    {
      keepPreviousData: true
    }
  )

  return { data, refetch }
}

export default useGetStandingOrders
