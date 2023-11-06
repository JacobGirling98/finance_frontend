import { FC, useState } from "react"
import { StandingOrder } from "../types/StandingOrders"
import { useQuery } from "react-query"
import axios from "axios"
import Dialog from "../components/utils/Dialog"
import AddStandingOrder from "../components/forms/standing-order/AddStandingOrder"
import { Entity } from "../types/Api"
import PageTitle from "../components/utils/PageTitle"
import Button from "../components/button/Button"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useTable } from "../hooks/useTable"
import TableCell from "../components/table/TableCell"
import TableHeader from "../components/table/TableHeader"
import EditStandingOrder from "../components/forms/standing-order/EditStandingOrder"
import { formatFrequency, handleUndefined } from "../utils/TableUtils"
import { toTransactionType } from "../utils/transactionType"
import DeleteStandingOrder from "../components/forms/standing-order/DeleteStandingOrder"

const StandingOrdersPage: FC = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [standingOrderToMutate, setStandingOrderToMutate] =
    useState<Entity<StandingOrder>>()

  const addDialogOnClose = () => {
    setAddDialogOpen(false)
  }

  const editDialogOnClose = () => {
    setEditDialogOpen(false)
    setStandingOrderToMutate(undefined)
  }

  const deleteDialogOnClose = () => {
    setDeleteDialogOpen(false)
    setStandingOrderToMutate(undefined)
  }

  const editOnClick = (standingOrder: Entity<StandingOrder>) => {
    setStandingOrderToMutate(standingOrder)
    setEditDialogOpen(true)
  }

  const deleteOnClick = (standingOrder: Entity<StandingOrder>) => {
    setStandingOrderToMutate(standingOrder)
    setDeleteDialogOpen(true)
  }

  const { data } = useQuery<Entity<StandingOrder>[]>(
    "standingOrders",
    async () => {
      const response = await axios.get(`/api/standing-orders`)
      return response.data
    }
  )

  const tableHeaders = (
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

  const rowMapper = (standingOrder: Entity<StandingOrder>) => (
    <>
      <TableCell>{standingOrder.domain.nextDate}</TableCell>
      <TableCell>
        {formatFrequency(
          standingOrder.domain.frequencyUnit,
          standingOrder.domain.frequencyQuantity
        )}
      </TableCell>
      <TableCell>{standingOrder.domain.category}</TableCell>
      <TableCell>£{standingOrder.domain.value}</TableCell>
      <TableCell>{standingOrder.domain.description}</TableCell>
      <TableCell>{toTransactionType(standingOrder.domain.type)}</TableCell>
      <TableCell>{handleUndefined(standingOrder.domain.recipient)}</TableCell>
      <TableCell>{handleUndefined(standingOrder.domain.inbound)}</TableCell>
      <TableCell>{handleUndefined(standingOrder.domain.outbound)}</TableCell>
      <TableCell>
        <div className="flex justify-between">
          <button onClick={() => editOnClick(standingOrder)}>
            <PencilIcon className="h-5 text-text-light hover:text-text-soft-light active:text-text-strong-light dark:text-text-dark dark:hover:text-text-soft-dark dark:active:text-text-strong-dark" />
          </button>
          <button onClick={() => deleteOnClick(standingOrder)}>
            <TrashIcon className="h-5 text-text-light hover:text-text-soft-light active:text-text-strong-light dark:text-text-dark dark:hover:text-text-soft-dark dark:active:text-text-strong-dark" />
          </button>
        </div>
      </TableCell>
    </>
  )

  const { table } = useTable(tableHeaders, rowMapper, data ?? [])

  return (
    <>
      <div className="flex mt-5 mx-5">
        <PageTitle title={"Standing Orders"} />
        <div className="ml-auto my-auto">
          <Button value={"Add"} onClick={() => setAddDialogOpen(true)} />
        </div>
      </div>
      <Dialog
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        onClose={addDialogOnClose}
        title="Add a standing order"
      >
        <AddStandingOrder closeDialog={addDialogOnClose} />
      </Dialog>
      {standingOrderToMutate && (
        <>
          <Dialog
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            onClose={editDialogOnClose}
            title="Edit a standing order"
          >
            <EditStandingOrder
              closeDialog={editDialogOnClose}
              standingOrder={standingOrderToMutate}
            />
          </Dialog>
          <Dialog
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            onClose={deleteDialogOnClose}
            title="Delete a standing order"
          >
            <DeleteStandingOrder
              closeDialog={deleteDialogOnClose}
              standingOrder={standingOrderToMutate}
            />
          </Dialog>
        </>
      )}
      {data && <div className="p-2 flex">{table()}</div>}
    </>
  )
}

export default StandingOrdersPage
