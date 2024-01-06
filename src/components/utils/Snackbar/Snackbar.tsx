import { Transition } from "@headlessui/react"
import { ChildrenProps } from "../../../types/ChildrenProps"

interface SnackbarProps {
  isOpen: boolean
}

const Snackbar = ({ isOpen, children }: SnackbarProps & ChildrenProps) => {
  return (
    <>
      <Transition
        appear={true}
        show={isOpen}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed bottom-11 right-5 flex shadow-xl">{children}</div>
      </Transition>
    </>
  )
}

export default Snackbar
