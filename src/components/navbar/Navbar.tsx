import { BanknotesIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { useMutation } from "react-query"
import axios, { AxiosError } from "axios"
import Spinner from "../utils/Spinner"
import Button from "../button/Button"
import DarkModeSwitch from "../inputs/DarkModeSwitch/DarkModeSwitch"
import React, { FC } from "react"
import { useModal } from "../../hooks/useModal"

interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: FC<NavbarProps> = ({ setSidebarOpen }) => {
  const { toggleSuccessModal, toggleErrorModal } = useModal()

  const { mutate: mutatePush, isLoading: pushIsLoading } = useMutation<
    void,
    AxiosError,
    void
  >("googlePush", async () => await axios.post(`/api/backup/push`), {
    onSuccess: () => {
      toggleSuccessModal("Successfully pushed data to Google Drive")
    },
    onError: (error) => {
      toggleErrorModal(error.message)
    }
  })

  const { mutate: mutatePull, isLoading: pullIsLoading } = useMutation<
    void,
    AxiosError,
    void
  >("googlePull", async () => await axios.post(`/api/backup/pull`), {
    onSuccess: () => {
      toggleSuccessModal("Successfully pulled data from Google Drive")
    },
    onError: (error) => {
      toggleErrorModal(error.message)
    }
  })

  return (
    <>
      <Spinner isOpen={pushIsLoading || pullIsLoading} muteBackground={true} />
      <nav className="bg-slate-100 dark:bg-zinc-800">
        <div className="flex py-2 mx-2">
          <button onClick={() => setSidebarOpen((isOpen) => !isOpen)}>
            <div className="h-6 w-6 my-auto ml-2 mr-4 text-text-light dark:text-text-dark">
              <Bars3Icon />
            </div>
          </button>
          <div className="flex text-text-light dark:text-text-dark font-bold text-xl pl-2 pr-8 items-center">
            <p className="pr-2">My Finances</p>
            <BanknotesIcon className="block h-6 w-6" aria-hidden={true} />
          </div>
          <div className="flex items-center ml-auto mr-5">
            <DarkModeSwitch />
          </div>
          <div className="flex items-center">
            <Button
              value="Sync to"
              className="px-2 font-medium w-28"
              onClick={mutatePush}
            />
            <Button
              value="Sync from"
              className="px-2 font-medium w-28"
              onClick={mutatePull}
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
