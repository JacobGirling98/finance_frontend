import { FC, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

interface SelectProps {
  value: string;
  onChange: (s: string) => void;
  options: string[];
}

const Select: FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className="relative w-full h-10 cursor-default rounded-md
                  bg-input-light dark:bg-input-dark
                  text-text-light dark:text-text-dark
                  text-left pl-3 shadow-lg focus:outline-none"
        >
          <span className="block truncate">{value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
            <ChevronUpDownIcon className="h-5 w-5" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-opacity-80 p-1 text-base
                  bg-transparent-light dark:bg-transparent-dark
                  text-text-light dark:text-text-dark
                  focus:outline-none shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md"
          >
            {options.map((value, index) => (
              <Listbox.Option
                key={index}
                value={value}
                className={() =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md 
                          hover:bg-special-light dark:hover-bg-special-dark 
                          hover:text-special-text-light dark:hover:text-special-text-dark
                          hover:opacity-80`
                }
              >
                {({ selected }) => (
                  <>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                    {value}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
