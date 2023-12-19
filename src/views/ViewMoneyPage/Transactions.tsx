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
import useDebounce from "../../hooks/useDebounce"
import Input from "../../components/inputs/Input"
import Dialog from "../../components/utils/Dialog"
import EditTransaction from "../../components/forms/change-transaction/EditTransaction"
import DeleteTransaction from "../../components/forms/change-transaction/DeleteTransaction"
import useGetTransactions from "../../hooks/useGetTransactions"

const Transactions = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState("20")
  const [searchTerm, setSearchTerm] = useState("")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToMutate, setTransactionToMutate] =
    useState<Entity<Transaction>>()

  const debouncedSearchTerm = useDebounce(searchTerm, 200)

  const pageSizeOptions = ["10", "20", "50", "100"]

  const editDialogOnClose = () => {
    setEditDialogOpen(false)
    setTransactionToMutate(undefined)
  }

  const deleteDialogOnClose = () => {
    setDeleteDialogOpen(false)
    setTransactionToMutate(undefined)
  }

  const editOnClick = (transaction: Entity<Transaction>) => {
    setTransactionToMutate(transaction)
    setEditDialogOpen(true)
  }

  const deleteOnClick = (transaction: Entity<Transaction>) => {
    setTransactionToMutate(transaction)
    setDeleteDialogOpen(true)
  }

  const { data: allData } = useQuery<Page<Transaction>>(
    ["transactions", page, pageSize],
    async () => {
      const response = await axios.get("/api/transaction", {
        params: {
          pageNumber: page,
          pageSize: pageSize
        }
      })
      return response.data
    },
    {
      keepPreviousData: true
    }
  )

  const { data: searchData } = useGetTransactions(
    debouncedSearchTerm,
    page,
    parseInt(pageSize)
  )

  const data = debouncedSearchTerm !== "" ? searchData : allData

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
      <div className="flex mx-3 mb-3 justify-between items-end">
        <div>
          <Input
            type="text"
            value={searchTerm}
            onChange={setSearchTerm}
            title="Search"
            className="h-7"
          />
        </div>
        <div className="flex items-end">
          <div className="mr-3 flex">
            <Button className="h-7 w-7" onClick={previousPage}>
              <div className="w-full flex justify-center">
                <div className="h-4 w-4">
                  <ArrowLeftIcon />
                </div>
              </div>
            </Button>
            <div className="mx-2 text-text-light dark:text-text-dark">
              {page}
            </div>
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
      </div>
      {transactionToMutate && (
        <>
          <Dialog
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            onClose={editDialogOnClose}
            title="Edit a standing order"
          >
            <EditTransaction
              closeDialog={editDialogOnClose}
              transaction={transactionToMutate}
            />
          </Dialog>
          <Dialog
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            onClose={deleteDialogOnClose}
            title="Delete a standing order"
          >
            <DeleteTransaction
              closeDialog={deleteDialogOnClose}
              transaction={transactionToMutate}
            />
          </Dialog>
        </>
      )}
      {data && <div>{table()}</div>}
    </>
  )
}

export default Transactions
