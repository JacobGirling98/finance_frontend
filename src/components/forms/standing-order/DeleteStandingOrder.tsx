import useDeleteStandingOrder from "../../../hooks/useDeleteStandingOrder"
import { Entity } from "../../../types/Api"
import { StandingOrder } from "../../../types/StandingOrders"
import Button from "../../button/Button"

interface DeleteStandingOrderProps {
  standingOrder: Entity<StandingOrder>
  closeDialog: () => void
}

const DeleteStandingOrder = ({
  standingOrder,
  closeDialog
}: DeleteStandingOrderProps) => {
  const { deleteStandingOrder } = useDeleteStandingOrder(closeDialog)

  return (
    <>
      <div className="pt-2 text-text-light dark:text-text-dark">
        <div>Are you sure you want to delete this standing order?</div>
        <div className="my-2 w-full flex justify-center space-x-2">
          <div>{standingOrder.domain.description}:</div>
          <div>£{standingOrder.domain.value}</div>
        </div>
        <div className="flex mt-5 justify-center">
          <Button onClick={() => deleteStandingOrder(standingOrder.id)}>
            Delete
          </Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </div>
      </div>
    </>
  )
}

export default DeleteStandingOrder
