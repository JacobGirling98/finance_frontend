import React, {useEffect} from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import useRouter from "./hooks/useRouter";
import {ReactQueryDevtools} from "react-query/devtools";
import Providers from "./Providers";
import ResultModal from "./components/utils/Modal";
import {userIsInDarkMode} from "./utils/dark-mode";



const App = () => {
  useEffect(() => {
    userIsInDarkMode() ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
  }, []);

  const routing = useRouter();

  return (
    <Providers>
      <div className="flex flex-col bg-white dark:bg-gray-800 min-h-screen">
        <Navbar/>
        <div className="flex-grow">
          {routing}
        </div>
        <ResultModal/>
        <Footer/>
      </div>
      <ReactQueryDevtools/>
    </Providers>
  );
};

export default App;
