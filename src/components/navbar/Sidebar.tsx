import { FC } from "react"
import NavButtons from "../../navigation/NavButtons"

interface SidebarProps {
  isOpen: boolean
}

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  return (
    <>
      <div
        className={`bg-slate-100 dark:bg-zinc-800 z-50 relative transition-all
        duration-300 ${isOpen ? "w-52" : "w-0"}`}
      >
        <div
          className={`fixed duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col w-full bg-blue-300">
            <NavButtons />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
