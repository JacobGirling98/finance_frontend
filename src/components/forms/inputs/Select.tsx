import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import React, {FC, Fragment, useState} from "react";
import ErrorMessage from "./ErrorMessage";
import {isNotBlank} from "../new-transaction/validation";

interface SelectProps {
  selected: string;
  setSelected: (s: string) => void;
  options: string[];
  allowCreate?: boolean;
  title: string;
  error?: string;
  onCreate?: (s: string) => void;
  showAllOptions?: boolean
}

const Select: FC<SelectProps> = (
  {
    selected,
    setSelected,
    options,
    allowCreate,
    title,
    error,
    onCreate,
    showAllOptions = true
  }) => {
  const [query, setQuery] = useState<string>("");

  const search = (values: string[]): string[] => values.filter(option => option.toLowerCase().includes(query.toLowerCase()))

  const filteredOptions = () => {
    if (showAllOptions) return search(options);
    return query.length < 3 ? [] : search(options);
  };

  const onChange = (value: string) => {
    if (!options.includes(value) && allowCreate && onCreate) {
      onCreate(value)
    }
    setSelected(value)
  }

  return (
    <>
      <label htmlFor="category" className="text-white mb-1 ml-2">
        {title}
      </label>
      <Combobox value={selected} onChange={onChange}>
        <div className="relative">
          <div
            className={`relative w-full h-10 text-gray-100 cursor-default overflow-hidden rounded-md bg-gray-600 text-left shadow-lg focus:outline-none ${isNotBlank(error) ? "border border-red-600" : ""}`}
          >
            <Combobox.Input
              onChange={event => {
                setQuery(event.target.value)
              }}
              onClick={() => {
                setSelected("");
                setQuery("");
              }}
              className="w-full rounded-md h-full border-none py-2 pl-3 pr-10 leading-5 bg-gray-600 focus:outline-none"
            />
            <Combobox.Button className={"absolute inset-y-0 right-0 flex pr-1"}>
              <ChevronUpDownIcon
                className="h-5 w-5 my-auto text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {(filteredOptions().length > 0 || (allowCreate && onCreate && query.length > 0)) && (
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options
                className="absolute mt-1 z-10 max-h-60 bg-gray-900 bg-opacity-80 backdrop-blur-md w-full rounded-md overflow-auto p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
              >
                {filteredOptions().map((category, index) => (
                  <Combobox.Option
                    key={index}
                    value={category}
                    className={({active}) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${active ? "bg-gray-500 opacity-80" : ""}`
                    }
                  >
                    {({selected}) => (
                      <>
                        <span>{category}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                              <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                            </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
                {allowCreate && onCreate && query.length > 0 && (
                  <Combobox.Option
                    key={filteredOptions.length}
                    value={query}
                    className={({active}) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${active ? "bg-gray-500 opacity-80" : ""}`
                    }
                    onClick={() => {
                      onCreate(query)
                    }}
                  >
                    Create "{query}"
                  </Combobox.Option>
                )}
              </Combobox.Options>
            </Transition>
          )}
          <ErrorMessage message={error}/>
        </div>
      </Combobox>
    </>
  );
};

export default Select;
