import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import TableCell from "./TableCell"

interface EditingTableCellProps<T> {
  editOnClick: (_: T) => void
  deleteOnClick: (_: T) => void
  dataEntry: T
}

const EditingTableCell = <T extends object>({
  editOnClick,
  deleteOnClick,
  dataEntry
}: EditingTableCellProps<T>) => {
  return (
    <>
      <TableCell>
        <div className="flex justify-between">
          <button onClick={() => editOnClick(dataEntry)}>
            <PencilIcon className="h-5 text-text-light hover:text-text-soft-light active:text-text-strong-light dark:text-text-dark dark:hover:text-text-soft-dark dark:active:text-text-strong-dark" />
          </button>
          <button onClick={() => deleteOnClick(dataEntry)}>
            <TrashIcon className="h-5 text-text-light hover:text-text-soft-light active:text-text-strong-light dark:text-text-dark dark:hover:text-text-soft-dark dark:active:text-text-strong-dark" />
          </button>
        </div>
      </TableCell>
    </>
  )
}

export default EditingTableCell
