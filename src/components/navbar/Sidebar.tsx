import { FC } from "react"
import NavButtons from "../../navigation/NavButtons"

interface SidebarProps {
  isOpen: boolean
}

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  return (
    <>
      <aside
        className={`bg-slate-100 dark:bg-zinc-800 z-50 relative transition-all
        duration-300 ${isOpen ? "w-52" : "w-0"}`}
      >
        <div
          className={`flex flex-col overflow-hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-all`}
        >
          <NavButtons />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
