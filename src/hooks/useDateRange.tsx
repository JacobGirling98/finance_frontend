import { useEffect, useState } from "react"
import { DateRange, Period, periods } from "../types/ViewMoney.ts"
import {
  matchingDateRange,
  parsingFn
} from "../utils/date-range-helpers/date-range-helpers.ts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import UnionSelect from "../components/inputs/select/UnionSelect.tsx"
import Select from "../components/inputs/select/Select.tsx"

const useDateRange = (defaultPeriod: Period = "Fiscal Month") => {
  const [period, setPeriod] = useState<Period>(defaultPeriod)
  const [dateRange, setDateRange] = useState<DateRange>()

  const periodToApiPeriod = (period: Period): string => {
    switch (period) {
      case "Fiscal Month":
        return "fiscal-months"
      case "Fiscal Year":
        return "fiscal-years"
      case "Month":
        return "months"
      case "Year":
        return "years"
    }
  }

  const { data: dateRangeData } = useQuery<DateRange[]>({
    queryKey: ["getDateRanges", period],
    queryFn: async () => {
      const response = await axios.get(
        `/api/reference/${periodToApiPeriod(period)}`
      )
      return response.data
    }
  })

  useEffect(() => {
    if (dateRangeData) setDateRange(dateRangeData[0])
  }, [dateRangeData])

  const dateRanges = dateRangeData ?? []

  const format = parsingFn(period)

  const selectDateRange = (dateRangeString: string) => {
    setDateRange(matchingDateRange(dateRangeString, period, dateRanges))
  }

  const DateRanges = () => (
    <div className="flex space-x-3">
      <div className="w-72">
        <UnionSelect value={period} onChange={setPeriod} options={periods} />
      </div>
      {dateRange && (
        <div className="w-72">
          <Select
            value={format(dateRange)}
            onChange={selectDateRange}
            options={dateRanges.map((r) => format(r))}
          />
        </div>
      )}
    </div>
  )

  return {
    DateRanges,
    dateRange
  }
}

export default useDateRange
