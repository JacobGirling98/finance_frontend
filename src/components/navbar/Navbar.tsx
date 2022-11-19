import {BanknotesIcon} from "@heroicons/react/24/outline";
import NavButtons from "../../navigation/NavButtons";
import {useMutation} from "react-query";
import axios from "axios";
import {baseUrl} from "../../utils/constants";
import Spinner from "../Spinner";
import Button from "../button/Button";

const Navbar = () => {

  const {mutate, isLoading} = useMutation("gitSync", async () => await axios.post(`${baseUrl}/git/sync`, {}))

  return (
    <>
      <Spinner isOpen={isLoading} muteBackground={true}/>
      <nav className="bg-cyan-100 dark:bg-gray-800">
        <div className="flex py-2 mx-2">
          <div className="flex text-gray-300 font-bold text-xl pl-2 pr-8 items-center">
            <p className="pr-2">My Finances</p>
            <BanknotesIcon className="block h-6 w-6" aria-hidden={true}/>
          </div>
          <NavButtons
            className="px-2 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out text-gray-300 hover:bg-gray-700 hover:text-white"/>
          <div className="flex items-center ml-auto">
            <Button value="Sync" onClick={mutate} className="px-2 font-medium w-28"/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
