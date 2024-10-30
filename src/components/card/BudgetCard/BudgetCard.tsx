import React from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import colors from "tailwindcss/colors"
import useDarkModeObserver from "../../../hooks/useDarkModeObserver.ts"

interface BudgetCardProps {
  category: string
  actualSpending: number
  budgetAllowance: number
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  category,
  actualSpending,
  budgetAllowance
}) => {
  const remainingAmount = budgetAllowance - actualSpending

  const data = [
    { name: "Spent", value: actualSpending },
    { name: "Remaining", value: remainingAmount }
  ]

  const colourMode = useDarkModeObserver()

  const lightColours = [colors.green["600"], colors.gray["200"]]
  const darkColours = [colors.green["500"], colors.gray["700"]]

  const COLORS = colourMode === "dark" ? darkColours : lightColours

  const pieChartSize = 120

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-1 text-text-light dark:text-text-dark">
        {category}
      </h2>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <p className="text-special-light dark:text-special-dark font-semibold">
            Spending
          </p>
          <p className="text-text-light dark:text-text-dark">
            {actualSpending}
          </p>
          <p className="text-special-light dark:text-special-dark font-semibold">
            Allowance
          </p>
          <p className="text-text-light dark:text-text-dark">
            {budgetAllowance}
          </p>
        </div>
        <div className="w-1/2 flex justify-center">
          <PieChart width={pieChartSize} height={pieChartSize}>
            <Pie
              dataKey="value"
              data={data}
              innerRadius={(pieChartSize * 3) / 10}
              outerRadius={(pieChartSize * 4) / 10}
              fill="#8884d8"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  )
}

export default BudgetCard
