import React from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";

interface NavType {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavType[] = [
  { name: "Add Transaction", href: "/new", current: false },
  { name: "View Spending", href: "/view", current: false },
  { name: "Standing Orders", href: "/standing", current: false },
];

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
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "px-3 py-2 rounded-md text-sm font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </a>
        ))}
        <div className="text-right">
          <button className="px-2 bg-indigo-600 rounded-md inline-flex justify-center text-sm font-medium text-white">
            Sync
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
