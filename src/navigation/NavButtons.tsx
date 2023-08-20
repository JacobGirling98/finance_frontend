import { FC } from "react";
import { Link } from "react-router-dom";
import { navigation } from "../hooks/useRouter";

const NavButtons: FC = () => {
  return (
    <>
      {navigation.map((item) => (
        <Link to={item.path} className="rounded-md" key={item.name}>
          <button
            key={item.name}
            className="px-2 py-2 text-sm font-medium transition duration-150 ease-in-out
              text-text-light dark:text-text-dark
              hover:bg-slate-200 dark:hover:bg-zinc-700
              active:bg-slate-300 dark:active:bg-zinc-600
              w-full whitespace-nowrap h-12"
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </button>
        </Link>
      ))}
    </>
  );
};

export default NavButtons;
