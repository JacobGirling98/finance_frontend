import { FC, useState } from "react"
import { StandingOrder } from "../types/StandingOrders"
import { useQuery } from "react-query"
import axios from "axios"
import Dialog from "../components/utils/Dialog"
import AddStandingOrder from "../components/forms/standing-order/AddStandingOrder"
import { Entity } from "../types/Api"
import PageTitle from "../components/utils/PageTitle"
import Button from "../components/button/Button"
import { useTable } from "../hooks/useTable"
import TableCell from "../components/table/TableCell"
import TableHeader from "../components/table/TableHeader"
import EditStandingOrder from "../components/forms/standing-order/EditStandingOrder"
import { formatFrequency, handleUndefined } from "../utils/TableUtils"
import { toTransactionType } from "../utils/transactionType"
import DeleteStandingOrder from "../components/forms/standing-order/DeleteStandingOrder"
import EditingTableCell from "../components/table/EditingTableCell"

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
      <EditingTableCell editOnClick={editOnClick} deleteOnClick={deleteOnClick} dataEntry={standingOrder}/>
    </>
  )

  const { table } = useTable(tableHeaders, rowMapper, data ?? [])

  return (
    <>
      <div className="flex mt-5 mx-5">
        <PageTitle title={"Standing Orders"} />
        <div className="ml-auto my-auto">
          <Button onClick={() => setAddDialogOpen(true)} >Add</Button>
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
      {data && <div className="m-2 p-2 flex">{table()}</div>}
    </>
  )
}

export default StandingOrdersPage
