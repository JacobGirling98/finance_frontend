import React, {FC, useState} from "react";
import {Bars3Icon} from "@heroicons/react/24/solid"
import {Transition} from "@headlessui/react";
import NavButtons from "../../navigation/NavButtons";

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(isOpen => !isOpen)}>
        <div className="h-6 w-6 my-auto ml-2 mr-4 text-text-light dark:text-text-dark">
          <Bars3Icon/>
        </div>
      </button>

      <div className="absolute left-0 top-0 h-screen">
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="w-52 bg-bg-highlight-dark z-50 h-screen flex flex-col">
            <button onClick={() => setIsOpen(isOpen => !isOpen)} className="mb-8">
              <div className="h-6 w-6 py-2 ml-4 mt-2 text-text-light dark:text-text-dark">
                <Bars3Icon/>
              </div>
            </button>
            <div className="ml-2">
              <NavButtons />
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}

export default Sidebar