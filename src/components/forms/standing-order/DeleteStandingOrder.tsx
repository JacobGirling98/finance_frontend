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
      <div className="pt-2">
        <div>Are you sure you want to delete this standing order?</div>
        <div className="my-2 w-full flex justify-center space-x-2">
          <div>{standingOrder.domain.description}:</div>
          <div>£{standingOrder.domain.value}</div>
        </div>
        <div className="flex mt-5 justify-center">
          <Button
            value="Delete"
            onClick={() => deleteStandingOrder(standingOrder.id)}
          />
          <Button value="Cancel" onClick={closeDialog} />
        </div>
      </div>
    </>
  )
}

export default DeleteStandingOrder