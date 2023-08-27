import { useEffect, useState } from "react"
import Providers from "./Providers.tsx"
import useRouter from "./hooks/useRouter.tsx"
import { userIsInDarkMode } from "./utils/dark-mode.ts"
import Navbar from "./components/navbar/Navbar.tsx"
import ResultModal from "./components/utils/Modal.tsx"
import Footer from "./components/footer/Footer.tsx"
import { ReactQueryDevtools } from "react-query/devtools"
import Sidebar from "./components/navbar/Sidebar.tsx"

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    userIsInDarkMode()
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark")
  }, [])

  const routing = useRouter()

  return (
    <Providers>
      <div className="flex flex-col bg-slate-50 dark:bg-zinc-950 min-h-screen">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <div className="flex grow transition ease-in-out duration-300">
          <Sidebar isOpen={sidebarOpen} />
          <div className="flex grow overflow-auto">
            <div className="flex flex-col w-full rounded-md m-3 bg-slate-200 dark:bg-zinc-900">
              {routing}
            </div>
          </div>
          <ResultModal />
        </div>
        <Footer />
      </div>
      <ReactQueryDevtools />
    </Providers>
  )
}

export default App
