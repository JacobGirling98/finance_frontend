import { useEffect, useState } from "react"
import HeadlineCard from "../../../components/card/HeadlineCard/HeadlineCard"
import UnionSelect from "../../../components/inputs/select/UnionSelect"
import { DateRange, Period, Summary, periods } from "../../../types/ViewMoney"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Select from "../../../components/inputs/select/Select"
import {
  matchingDateRange,
  parsingFn
} from "../../../utils/date-range-helpers/date-range-helpers"

const Headlines = () => {
  const [period, setPeriod] = useState<Period>("Fiscal Month")
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

  const selectDateRange = (dateRangeString: string) => {
    setDateRange(matchingDateRange(dateRangeString, period, dateRanges))
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
        <div className="flex mb-5 space-x-3">
          <div className="w-72">
            <UnionSelect
              value={period}
              onChange={setPeriod}
              options={periods}
              title="Period"
            />
          </div>
          {dateRange && (
            <div className="w-72">
              <Select
                value={format(dateRange)}
                onChange={selectDateRange}
                options={dateRanges.map((r) => format(r))}
                title="Period"
              />
            </div>
          )}
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
