import TableHeader from "../../components/table/TableHeader"
import { Entity, Page } from "../../types/Api"
import TableCell from "../../components/table/TableCell"
import { Transaction } from "../../types/ViewMoney"
import { toTransactionType } from "../../utils/transactionType"
import { handleUndefined } from "../../utils/TableUtils"
import EditingTableCell from "../../components/table/EditingTableCell"
import { useTable } from "../../hooks/useTable"
import Select from "../../components/inputs/select/Select"
import { useState } from "react"
import Button from "../../components/button/Button"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useQuery } from "react-query"
import axios from "axios"

const Transactions = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState("20")

  const pageSizeOptions = ["10", "20", "50", "100"]

  const { data } = useQuery<Page<Transaction>>(
    ["transactions", page, pageSize],
    async () => {
      const response = await axios.get("/api/transaction", {
        params: {
          pageNumber: page,
          pageSize: pageSize
        }
      })
      return response.data
    }
  )

  const maxPages = data?.totalPages ?? 1

  const transactions = data?.data ?? []

  const nextPage = () => {
    if (page < maxPages) {
      setPage((p) => p + 1)
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage((p) => p - 1)
    }
  }

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

  const { table } = useTable(tableHeaders, rowMapper, transactions)

  return (
    <>
      <div className="flex mx-3 mb-3 justify-end items-end">
        <div className="mr-3 flex">
          <Button className="h-7 w-7" onClick={previousPage}>
            <div className="w-full flex justify-center">
              <div className="h-4 w-4">
                <ArrowLeftIcon />
              </div>
            </div>
          </Button>
          <div className="mx-2 text-text-light dark:text-text-dark">{page}</div>
          <Button className="h-7 w-7" onClick={nextPage}>
            <div className="w-full flex justify-center">
              <div className="h-4 w-4">
                <ArrowRightIcon />
              </div>
            </div>
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
