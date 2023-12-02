import TableHeader from "../../components/table/TableHeader"
import { Entity } from "../../types/Api"
import TableCell from "../../components/table/TableCell"
import { Transaction } from "../../types/ViewMoney"
import { toTransactionType } from "../../utils/transactionType"
import { handleUndefined } from "../../utils/TableUtils"
import EditingTableCell from "../../components/table/EditingTableCell"
import { useTable } from "../../hooks/useTable"
import Select from "../../components/inputs/select/Select"
import { useState } from "react"
import Button from "../../components/button/Button"

const Transactions = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState("20")

  const pageSizeOptions = ["10", "20", "50", "100"]

  const data: Entity<Transaction>[] = [
    {
      id: "1",
      domain: {
        category: "Food",
        date: "2023-10-10",
        description: "Bananas",
        quantity: 5,
        type: "Credit",
        value: 0.8
      }
    }
  ]

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const editOnClick = (_transaction: Entity<Transaction>) => {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const deleteOnClick = (_transaction: Entity<Transaction>) => {}

  const tableHeaders = (
    <>
      <TableHeader>Date</TableHeader>
      <TableHeader>Category</TableHeader>
      <TableHeader>Value</TableHeader>
      <TableHeader>Description</TableHeader>
      <TableHeader>Type</TableHeader>
      <TableHeader>Quantity</TableHeader>
      <TableHeader>Recipient</TableHeader>
      <TableHeader>Inbound</TableHeader>
      <TableHeader>Outbound</TableHeader>
      <TableHeader>Source</TableHeader>
      <TableHeader className="w-16" />
    </>
  )

  const rowMapper = (transaction: Entity<Transaction>) => (
    <>
      <TableCell>{transaction.domain.date}</TableCell>
      <TableCell>{transaction.domain.category}</TableCell>
      <TableCell>£{transaction.domain.value}</TableCell>
      <TableCell>{transaction.domain.description}</TableCell>
      <TableCell>{toTransactionType(transaction.domain.type)}</TableCell>
      <TableCell>{transaction.domain.quantity}</TableCell>
      <TableCell>{handleUndefined(transaction.domain.recipient)}</TableCell>
      <TableCell>{handleUndefined(transaction.domain.inbound)}</TableCell>
      <TableCell>{handleUndefined(transaction.domain.outbound)}</TableCell>
      <TableCell>{handleUndefined(transaction.domain.source)}</TableCell>
      <EditingTableCell
        dataEntry={transaction}
        editOnClick={editOnClick}
        deleteOnClick={deleteOnClick}
      />
    </>
  )

  const { table } = useTable(tableHeaders, rowMapper, data)

  return (
    <>
      <div className="flex mx-3 mb-3 justify-end items-end">
        <div className="mr-3 flex">
          <Button className="h-7 w-20" onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <div className="mx-4">{page}</div>
          <Button className="h-7 w-20" onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
        <div className="w-24">
          <Select
            value={pageSize}
            options={pageSizeOptions}
            onChange={setPageSize}
            title="Page Size"
            className="h-7"
          />
        </div>
      </div>
      <div>{table()}</div>
    </>
  )
}

export default Transactions
