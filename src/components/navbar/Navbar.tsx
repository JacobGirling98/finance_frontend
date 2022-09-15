import React from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { navigation } from "../../hooks/useRouter";
import { Link } from "react-router-dom";

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = () => {
  return (
    <nav className="bg-cyan-100 dark:bg-gray-800">
      <div className="flex py-2 mx-2">
        <div className="flex text-gray-300 font-bold text-xl pl-2 pr-8 items-center">
          <p className="pr-2">My Finances</p>
          <BanknotesIcon className="block h-6 w-6" aria-hidden={true} />
        </div>
        {navigation.map(item => (
          <Link to={item.path} className="mx-1 rounded-md">
            <button
              key={item.name}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                " px-2 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </button>
          </Link>
        ))}
        <div className="flex items-center ml-auto">
          <button className="px-2 bg-indigo-700 rounded-md text-base font-medium text-white h-full w-28 hover:bg-indigo-600 active:bg-indigo-500 transition duration-150 ease-in-out">
            <span>Sync</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
