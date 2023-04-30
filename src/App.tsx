import { useEffect } from "react";
import Providers from "./Providers.tsx";
import useRouter from "./hooks/useRouter.tsx";
import { userIsInDarkMode } from "./utils/dark-mode.ts";
import Navbar from "./components/navbar/Navbar.tsx";
import ResultModal from "./components/utils/Modal.tsx";
import Footer from "./components/footer/Footer.tsx";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => {
  useEffect(() => {
    userIsInDarkMode()
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, []);

  const routing = useRouter();

  return (
    <Providers>
      <div className="flex flex-col bg-bg-light dark:bg-bg-dark min-h-screen">
        <Navbar />
        <div className="flex-grow">{routing}</div>
        <ResultModal />
        <Footer />
      </div>
      <ReactQueryDevtools />
    </Providers>
  );
};

export default App;
