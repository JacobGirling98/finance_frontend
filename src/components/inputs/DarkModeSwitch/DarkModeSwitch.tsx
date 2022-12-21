import React, {FC, useEffect, useState} from "react";
import {Switch} from "@headlessui/react";
import {MoonIcon} from "@heroicons/react/24/outline"
import {userIsInDarkMode} from "../../../utils/dark-mode";

const DarkModeSwitch: FC = () => {
  const [enabled, setEnabled] = useState(userIsInDarkMode())

  useEffect(() => {
    if (enabled)
      document.documentElement.classList.add("dark")
    else
      document.documentElement.classList.remove("dark")
  }, [enabled])

  return (
    <div className="flex align-middle">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`bg-transparent border border-special-hover-light dark:border-special-hover-dark relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-special-light dark:bg-special-dark transition`}
          />
      </Switch>
      <div className="h-5 w-5 ml-2 my-auto text-special-light dark:text-special-dark">
        <MoonIcon/>
      </div>
    </div>
  )
}


export default DarkModeSwitch