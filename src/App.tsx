import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

const App = () => {

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div className="bg-white dark:bg-slate-800">
      <Navbar />
    </div>
  );
}

export default App;
