import HeadlineCard from "../../../components/card/HeadlineCard/HeadlineCard/HeadlineCard"
import { Summary } from "../../../types/ViewMoney"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import useDateRange from "../../../hooks/useDateRange.tsx"

const Headlines = () => {
  const { dateRange, DateRanges } = useDateRange()

  const { data: summary } = useQuery<Summary, AxiosError>({
    queryKey: ["summary", dateRange],
    queryFn: async () => {
      const response = await axios.get("/api/view/headlines", {
        params: {
          start: dateRange?.startDate,
          end: dateRange?.endDate
        }
      })
      return response.data
    },
    enabled: !!dateRange
  })

  return (
    <>
      <div className="mt-3">
        <div className="mb-5 ">
          <DateRanges />
        </div>
        {summary && (
          <div className="grid grid-cols-4 gap-4">
            <HeadlineCard title="Income" value={summary.income} />
            <HeadlineCard title="Spending" value={summary.spending} />
            <HeadlineCard title="Net" value={summary.net} />
            <HeadlineCard title="Savings" value={summary.savings} />
          </div>
        )}
      </div>
    </>
  )
}

export default Headlines
