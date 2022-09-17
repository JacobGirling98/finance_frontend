import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState } from "react";

interface SelectProps {
  selected: string;
  setSelected: (s: string) => void;
  options: string[];
}

const Select: FC<SelectProps> = ({ selected, setSelected, options }) => {
  const [query, setQuery] = useState<string>("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter(option => option.toLowerCase().includes(query));

  return (
    <>
      <label htmlFor="category" className="text-white mb-1 ml-2">
        Category
      </label>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative m-1">
          <div className="relative w-full h-10 text-gray-100 cursor-default overflow-hidden rounded-md bg-gray-600 text-left shadow-lg focus:outline-none focus-visible:ring-2 ring-1 ring-black">
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              onClick={() => {
                setSelected("");
                setQuery("");
              }}
              className="w-full rounded-md h-full border-none py-2 pl-3 pr-10 leading-5 bg-gray-600"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {filteredOptions.length > 0 && (
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute mt-1 max-h-60 bg-gray-900 bg-opacity-80 w-full rounded-md overflow-auto p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
                {filteredOptions.map((category, index) => (
                  <Combobox.Option
                    key={index}
                    value={category}
                    className="relative cursor-default select-none py-2 pl-10 pr-4 rounded-md hover:bg-gray-500 hover:opacity-80"
                  >
                    {({ selected }) => (
                      <>
                        <span>{category}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          )}
        </div>
      </Combobox>
    </>
  );
};

export default Select;
