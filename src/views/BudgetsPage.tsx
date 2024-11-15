import { FC } from "react"
import BudgetCard from "../components/card/BudgetCard/BudgetCard"
import { BudgetReportResponse } from "../types/Budget"
import PageTitle from "../components/utils/PageTitle.tsx"
import useDateRange from "../hooks/useDateRange.tsx"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Spinner from "../components/utils/Spinner.tsx"

const BudgetsPage: FC = () => {
  const { DateRanges, dateRange } = useDateRange("Month")

  const { data, isLoading } = useQuery<BudgetReportResponse[]>({
    queryKey: ["getBudgets", dateRange],
    queryFn: async () => {
      const response = await axios.get("/api/budget/report", {
        params: {
          start: dateRange?.startDate,
          end: dateRange?.endDate
        }
      })
      return response.data
    }
  })

  return (
    <div>
      <div className="flex p-5 justify-between">
        <PageTitle title={"Budgets"} />
        <DateRanges />
      </div>
      {isLoading ? (
        <Spinner isOpen={true} />
      ) : (
        <div className="grid grid-cols-6 gap-4 p-4">
          {(data ?? []).map((data) => (
            <BudgetCard
              category={data.budget.category}
              actualSpending={data.spending}
              budgetAllowance={data.budget.value}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BudgetsPage
