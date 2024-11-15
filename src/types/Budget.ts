import { DateRange } from "./ViewMoney.ts"

export interface Budget {
  monthlyAllowance: number
  annualAllowance: number
  monthlySpending: number
  annualSpending: number
  category: string
}

export interface BudgetReportResponse {
  budget: BudgetResponse
  dateRange: DateRange
  spending: number
}

export interface BudgetResponse {
  category: string
  value: number
}
