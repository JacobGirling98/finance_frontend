import React from "react";
import NavButtons from "../../navigation/NavButtons";

const HomePage = () => {
  return (
    <>
      <div className="flex">
        <div className="flex w-96 h-96 ml-52 mt-40 rounded-xl dark:bg-slate-700 ring-slate-500 shadow-xl">
          <div className="flex flex-col px-5 my-auto mx-auto">
            <NavButtons className="px-2 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out" />
          </div>
        </div>
        <h1 className="flex justify-center mt-40 text-8xl mx-auto self-center text-white font-bold text-center">
          Control your finances!
        </h1>
      </div>
    </>
  );
};

export default HomePage;
