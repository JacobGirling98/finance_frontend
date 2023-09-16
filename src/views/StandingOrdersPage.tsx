import { FC, useState } from "react"
import { StandingOrder } from "../types/StandingOrders"
import { useQuery } from "react-query"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import Dialog from "../components/utils/Dialog"
import AddStandingOrder from "../components/forms/standing-order/AddStandingOrder"
import { Entity } from "../types/Api"
import PageTitle from "../components/utils/PageTitle"
import Button from "../components/button/Button"
import Table, { TableCell, TableHeader, useTable } from "../components/table/Table"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { formatFrequency, formatTransactionType, handleUndefined } from "../utils/Table"

const StandingOrdersPage: FC = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const addDialogOnClose = () => {
    setAddDialogOpen(false)
  }

  const { data } = useQuery<Entity<StandingOrder>[]>("standingOrders", async () => {
    const response = await axios.get(`${BASE_URL}/standing-orders`)
    return response.data
  })

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
      <TableCell>{formatFrequency(standingOrder.domain.frequencyUnit, standingOrder.domain.frequencyQuantity)}</TableCell>
      <TableCell>{standingOrder.domain.category}</TableCell>
      <TableCell>{standingOrder.domain.value}</TableCell>
      <TableCell>{standingOrder.domain.description}</TableCell>
      <TableCell>{formatTransactionType(standingOrder.domain.type)}</TableCell>
      <TableCell>{handleUndefined(standingOrder.domain.recipient)}</TableCell>
      <TableCell>{handleUndefined(standingOrder.domain.inboundAccount)}</TableCell>
      <TableCell>{handleUndefined(standingOrder.domain.outboundAccount)}</TableCell>
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
    </>
  )

  const { table } = useTable(tableHeaders, rowMapper, data ?? [])

  return (
    <>
    <div className="flex mt-5 mx-5"> 
      <PageTitle title={"Standing Orders"} />
      <div className="ml-auto my-auto">
        <Button value={"Add"} onClick={() => setAddDialogOpen(true)}/>
      </div>
    </div>
    <Dialog
      open={addDialogOpen}
      setOpen={setAddDialogOpen}
      onClose={addDialogOnClose}
      title="Add a standing order"
    >
      <AddStandingOrder closeDialog={addDialogOnClose}/>
    </Dialog>
    {data && (
      <div className="p-2 flex">
        {table()}
      </div>
    )}
    </>
  )
}

export default StandingOrdersPage
