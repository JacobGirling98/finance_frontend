import React from "react";
import NavButtons from "../../navigation/NavButtons";

const HomePage = () => {
  return (
    <>
      <div className="flex mt-48">
        <div className="flex w-96 h-96 ml-52 rounded-xl dark:bg-slate-700 ring-slate-500 shadow-xl">
          <div className="flex flex-col px-5 py-10 mx-auto justify-around">
            <NavButtons className="px-2 h-10 w-full rounded-md text-sm font-medium transition duration-150 ease-in-out bg-indigo-700 text-white hover:bg-indigo-600 hover:text-white shadow-lg ring-1 ring-slate-600" />
          </div>
        </div>
        <h1 className="flex justify-center text-8xl mx-auto self-center text-white font-bold text-center">
          Control your finances!
        </h1>
      </div>
    </>
  );
};

export default HomePage;
