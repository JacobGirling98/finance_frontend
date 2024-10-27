import { FC } from "react"
import BudgetCard from "../components/card/BudgetCard/BudgetCard"
import { Budget } from "../types/Budget"

const mockData: Budget[] = [
  {
    monthlyAllowance: 500,
    annualAllowance: 6000,
    monthlySpending: 400,
    annualSpending: 4205,
    category: "Food"
  },
  {
    monthlyAllowance: 500,
    annualAllowance: 6000,
    monthlySpending: 600,
    annualSpending: 4205,
    category: "Food"
  },
  {
    monthlyAllowance: 500,
    annualAllowance: 6000,
    monthlySpending: 400,
    annualSpending: 4205,
    category: "Food"
  },
  {
    monthlyAllowance: 500,
    annualAllowance: 6000,
    monthlySpending: 400,
    annualSpending: 4205,
    category: "Food"
  },
  {
    monthlyAllowance: 500,
    annualAllowance: 6000,
    monthlySpending: 400,
    annualSpending: 4205,
    category: "Food"
  }
]

const BudgetsPage: FC = () => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {mockData.map(data => (
        <BudgetCard category={data.category} actualSpending={data.monthlySpending} budgetAllowance={data.monthlyAllowance} />
      ))}
    </div>
  )
}

export default BudgetsPage
