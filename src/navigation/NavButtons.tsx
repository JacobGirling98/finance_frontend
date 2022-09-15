import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { navigation } from '../hooks/useRouter';
import { resolveClasses } from '../utils/resolveClasses';

interface NavButtonsProps {
  className: string;
}

const NavButtons: FC<NavButtonsProps> = ({
  className
}) => { 
  return (
    <>
      {navigation.map(item => (
        <Link to={item.path} className="mx-1 rounded-md">
          <button
            key={item.name}
            className={resolveClasses(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              className
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </button>
        </Link>
      ))}
    </>
  )
 }

 export default NavButtons;