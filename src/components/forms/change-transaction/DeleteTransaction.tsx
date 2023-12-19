import useDeleteTransaction from "../../../hooks/useDeleteTransaction"
import { Entity } from "../../../types/Api"
import { Transaction } from "../../../types/ViewMoney"
import Button from "../../button/Button"

interface DeleteTransactionProps {
  transaction: Entity<Transaction>
  closeDialog: () => void
}

const DeleteTransaction = ({
  transaction,
  closeDialog
}: DeleteTransactionProps) => {
  const { deleteTransaction } = useDeleteTransaction(closeDialog)

  return (
    <>
      <div className="pt-2 text-text-light dark:text-text-dark">
        <div>Are you sure you want to delete this transaction?</div>
        <div className="my-2 w-full flex justify-center space-x-2">
          <div>{transaction.domain.description}:</div>
          <div>£{transaction.domain.value}</div>
        </div>
        <div className="flex mt-5 justify-center">
          <Button onClick={() => deleteTransaction(transaction.id)}>
            Delete
          </Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </div>
      </div>
    </>
  )
}

export default DeleteTransaction
