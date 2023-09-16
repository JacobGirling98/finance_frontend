import { FC, ReactNode } from "react"
import { StandingOrder } from "../../types/StandingOrders"
import { ChildrenProps } from "../../utils/ChildrenProps"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

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

const Table = () => {
  const headers = (
    <>
      <TableHeader>Next Date</TableHeader>
      <TableHeader>Frequency</TableHeader>
      <TableHeader>Category</TableHeader>
      <TableHeader>Value</TableHeader>
      <TableHeader>Description</TableHeader>
      <TableHeader>Type</TableHeader>
      <TableHeader>Recipient</TableHeader>
      <TableHeader>Inbound</TableHeader>
      <TableHeader>Outbound</TableHeader>
      <TableHeader className="w-16" />
    </>
  )

  return (
    <>
      <div className="w-full m-4 rounded-lg bg-slate-100 dark:bg-zinc-800">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <TableHeader>Next Date</TableHeader>
              <TableHeader>Frequency</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Value</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Recipient</TableHeader>
              <TableHeader>Inbound</TableHeader>
              <TableHeader>Outbound</TableHeader>
              <TableHeader className="w-16" />
            </tr>
          </thead>
          <tbody>
            <TableRow className="bg-slate-50 dark:bg-zinc-700" />
            <TableRow />
          </tbody>
        </table>
      </div>
    </>
  )
}

export const TableHeader: FC<ChildrenProps & TableRowProps> = ({
  children,
  className
}) => {
  return (
    <th
      className={`text-text-light dark:text-text-dark h-12 border-b text-left px-2 ${className}`}
    >
      {children}
    </th>
  )
}

export const TableCell: FC<ChildrenProps & TableRowProps> = ({
  children,
  className
}) => {
  return (
    <td
      className={`text-text-light dark:text-text-dark px-2 py-3 ${className}`}
    >
      {children}
    </td>
  )
}

interface TableRowProps {
  className?: string
}

const TableRow: FC<TableRowProps> = ({ className }) => {
  return (
    <tr className={className}>
      <TableCell>30-09-2023</TableCell>
      <TableCell>2 Months</TableCell>
      <TableCell>Food</TableCell>
      <TableCell>£10.50</TableCell>
      <TableCell>Chicken</TableCell>
      <TableCell>Debit</TableCell>
      <TableCell>-</TableCell>
      <TableCell>-</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        <div className="flex justify-between">
          <button>
            <PencilIcon className="h-5 text-text-light hover:text-text-soft-light active:text-text-strong-light dark:text-text-dark dark:hover:text-text-soft-dark dark:active:text-text-strong-dark" />
          </button>
          <button>
            <TrashIcon className="h-5 text-text-light hover:text-text-soft-light active:text-text-strong-light dark:text-text-dark dark:hover:text-text-soft-dark dark:active:text-text-strong-dark" />
          </button>
        </div>
      </TableCell>
    </tr>
  )
}

export default Table
