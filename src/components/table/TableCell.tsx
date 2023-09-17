import { FC } from "react"
import { ChildrenProps } from "../../types/ChildrenProps"
import { ClassName } from "../../types/Utils"

const TableCell: FC<ChildrenProps & ClassName> = ({
  children,
  className
}) => {
  return (
    <td
      className={`text-text-light dark:text-text-dark px-2 py-3 ${className}`}
    >
      {children}
    </td>
  )
}

export default TableCell