import { ReactNode } from "react"

export const useTable = <T,>(
  headers: ReactNode,
  rowMapper: (row: T) => ReactNode,
  data: T[]
) => {
  const table = () => (
    <div className="w-full m-4 rounded-lg bg-slate-100 dark:bg-zinc-800">
      <table className="w-full table-auto">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              className={`${
                index % 2 == 0 ? "bg-slate-50 dark:bg-zinc-700" : ""
              }`}
            >
              {rowMapper(entry)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return {
    table
  }
}

