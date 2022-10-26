import React, {useEffect} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import useRouter from "./hooks/useRouter";
import {ReactQueryDevtools} from "react-query/devtools";
import {NewDescriptionMappingsProvider} from "./context/useNewDescriptionMappings";

const App = () => {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const routing = useRouter();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <NewDescriptionMappingsProvider>
        <div className="bg-white dark:bg-gray-800  min-h-screen">
          <Navbar/>
          <div>
            {routing}
          </div>
          <Footer/>
        </div>
        <ReactQueryDevtools />
      </NewDescriptionMappingsProvider>
    </QueryClientProvider>

  );
};

export default App;
