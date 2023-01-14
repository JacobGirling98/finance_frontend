import {FC} from "react";
import {Link} from "react-router-dom";
import {navigation} from "../hooks/useRouter";

const NavButtons: FC = () => {
  return (
    <>
      {navigation.map(item => (
        <Link to={item.path} className="mx-1 rounded-md" key={item.name}>
          <button
            key={item.name}
            className="px-2 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
              text-text-light dark:text-text-dark
              hover:bg-bg-hover-light dark:hover:bg-bg-hover-dark
              active:bg-bg-active-light dark:active:bg-bg-active-dark"
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
