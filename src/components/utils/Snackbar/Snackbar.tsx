import { ChildrenProps } from "../../../types/ChildrenProps"

interface SnackbarProps {
  isOpen: boolean
}

const Snackbar = ({ isOpen, children }: SnackbarProps & ChildrenProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed bottom-11 right-5 flex shadow-xl">{children}</div>
      )}
    </>
  )
}

export default Snackbar
