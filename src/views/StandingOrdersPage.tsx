import { FC, useState } from "react"
import Table from "../components/table/Table"
import { createColumnHelper } from "@tanstack/react-table"
import { StandingOrder } from "../types/StandingOrders"
import { useQuery } from "react-query"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import Dialog from "../components/utils/Dialog"
import AddStandingOrder from "../components/forms/standing-order/AddStandingOrder"
import { Entity } from "../types/Api"

const StandingOrdersPage: FC = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(true)

  const addDialogOnClose = () => {
    setAddDialogOpen(false)
  }

  const { data } = useQuery<Entity<StandingOrder>[]>("standingOrders", async () => {
    const response = await axios.get(`${BASE_URL}/standing-orders`)
    return response.data
  })

  const columnHelper = createColumnHelper<Entity<StandingOrder>>()

  const columns = [
    columnHelper.accessor("domain.nextDate", {
      header: () => <span>Next Date</span>,
    }),
    columnHelper.accessor("domain.value", {
      header: () => <span>Value</span>,
    }),
    columnHelper.accessor("domain.frequency", {
      header: () => <span>Frequency</span>,
    }),
    columnHelper.accessor("domain.outgoing", {
      cell: (x) => x.getValue().toString(),
      header: () => <span>Outgoing</span>,
    }),
    columnHelper.accessor("domain.transactionType", {
      header: () => <span>Transaction Type</span>,
    }),
    columnHelper.accessor("domain.description", {
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("domain.category", {
      header: () => <span>Category</span>,
    }),
    columnHelper.accessor("domain.quantity", {
      header: () => <span>Quantity</span>,
    }),
  ]

  return (
    <>
      <Dialog
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        onClose={addDialogOnClose}
        title="Add a standing order"
      >
        <AddStandingOrder />
      </Dialog>
      {data && (
        <div className="p-2 flex justify-center">
          <Table data={data} columns={columns} />
        </div>
      )}
    </>
  )
}

export default StandingOrdersPage
