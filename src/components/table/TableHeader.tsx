import { FC } from "react"
import { ChildrenProps } from "../../utils/ChildrenProps"
import { ClassName } from "../../types/Utils"

const TableHeader: FC<ChildrenProps & ClassName> = ({
  children,
  className
}) => {
  return (
    <th
      className={`text-text-light dark:text-text-dark h-12 border-b text-left px-2 ${className}`}
    >
      {children}
    </th>
  )
}

export default TableHeader