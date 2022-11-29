import {Dialog, Transition} from "@headlessui/react";
import {FC, Fragment} from "react";
import {useModal} from "../../context/useModal";
import {CheckCircleIcon, ExclamationCircleIcon} from "@heroicons/react/24/solid";
import ExitButton from "../button/ExitButton";


const ResultModal: FC = () => {
  const {isOpen, setIsOpen, body, isSuccess} = useModal()

  const renderIcon = () => {
    const classes = "h-16 w-16 mx-auto"
    return isSuccess
      ? <CheckCircleIcon className={`${classes} text-green-400`}/>
      : <ExclamationCircleIcon className={`${classes} text-red-400`}/>
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={() => setIsOpen(false)}>
          <div className="fixed left-0 right-0 top-8 overflow-y-auto opacity-95">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-97"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden rounded-2xl px-6 pt-2 pb-4 text-left align-middle shadow-xl transition-all bg-background-dark-main">
                  <ExitButton onClick={() => setIsOpen(false)} className="fixed right-3"/>
                  {renderIcon()}
                  <div className="mt-1 flex justify-center">
                    <p className="text-sm text-gray-500">
                      {body}
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ResultModal;