import React, { useEffect } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import useRouter from "./hooks/useRouter";

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
    <div className="bg-white dark:bg-slate-800  min-h-screen">
      <Navbar />
      <div>
       {routing}
      </div>
      <Footer />
    </div>
  );
};

export default App;
