import { Dialog as HeadlessDiaglog, Transition } from "@headlessui/react"
import { Fragment, ReactNode } from "react"
import ExitButton from "../button/ExitButton"

interface DialogProps {
  open: boolean
  setOpen: (_: boolean) => void
  onClose: () => void
  title: string
  children: ReactNode
}

const Dialog = ({ open, setOpen, onClose, title, children }: DialogProps) => {
  return (
    <Transition
      appear
      show={open}
      as={Fragment}
      afterLeave={onClose}
    >
      <HeadlessDiaglog
        as="div"
        className="relative z-10"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDiaglog.Panel className="w-full max-w-md transform overflow-visible rounded-2xl bg-bg-light dark:bg-bg-dark p-6 text-left align-middle shadow-xl transition-all">
                <ExitButton onClick={() => setOpen(false)} className="fixed right-3" />
                <HeadlessDiaglog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-text-light dark:text-text-dark"
                >
                  {title}
                </HeadlessDiaglog.Title>
                {children}
              </HeadlessDiaglog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDiaglog>
    </Transition>
  )
}

export default Dialog
