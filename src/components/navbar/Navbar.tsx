import {BanknotesIcon} from "@heroicons/react/24/outline";
import NavButtons from "../../navigation/NavButtons";
import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {baseUrl} from "../../utils/constants";
import Spinner from "../utils/Spinner";
import Button from "../button/Button";
import {useModal} from "../../context/useModal";
import DarkModeSwitch from "../inputs/DarkModeSwitch/DarkModeSwitch";

const Navbar = () => {

  const {toggleSuccessModal, toggleErrorModal} = useModal()

  const {
    mutate,
    isLoading
  } = useMutation<void, AxiosError, void>("gitSync", async () => await axios.post(`${baseUrl}/git/sync`, {}), {
    onSuccess: () => {
      toggleSuccessModal("Successfully synced data")
    },
    onError: (error) => {
      toggleErrorModal(error.message)
    }
  })

  return (
    <>
      <Spinner isOpen={isLoading} muteBackground={true}/>
      <nav className="bg-bg-light dark:bg-bg-dark">
        <div className="flex py-2 mx-2">
          <div className="flex text-text-light dark:text-text-dark font-bold text-xl pl-2 pr-8 items-center">
            <p className="pr-2">My Finances</p>
            <BanknotesIcon className="block h-6 w-6" aria-hidden={true}/>
          </div>
          <NavButtons
            className="px-2 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out text-text-light dark:text-text-dark hover:bg-input-light dark:hover:bg-input-dark hover:text-text-light dark:hover:text-text-dark"
          />
          <div className="flex items-center ml-auto mr-5">
            <DarkModeSwitch/>
          </div>
          <div className="flex items-center">
            <Button value="Sync" onClick={mutate} className="px-2 font-medium w-28"/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
