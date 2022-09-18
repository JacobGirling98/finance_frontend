import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import CreditRow from "../../components/forms/CreditRow";

enum TransactionType {
  CREDIT = "Credit",
  DEBIT = "Debit",
  BANK_TRANSFER = "Bank Transfer",
  PERSONAL_TRANSFER = "Personal Transfer",
  INCOME = "Income",
}

const NewMoneyPage = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.CREDIT
  );

  const enumFrom = (key: string): TransactionType => {
    switch (key) {
      case "CREDIT":
        return TransactionType.CREDIT;
      case "DEBIT":
        return TransactionType.DEBIT;
      case "BANK_TRANSFER":
        return TransactionType.BANK_TRANSFER;
      case "PERSONAL_TRANSFER":
        return TransactionType.PERSONAL_TRANSFER;
      case "INCOME":
        return TransactionType.INCOME;
      default:
        return TransactionType.CREDIT;
    }
  };

  return (
    <>
      <div className="flex">
        <h1 className="text-white mx-5 my-1 text- text-4xl">
          <span className="italic">Add Transaction</span>
          <span>{` - ${transactionType}`}</span>
        </h1>
        <div className="ml-auto w-72 mx-5">
          <Listbox value={transactionType} onChange={setTransactionType}>
            <div className="relative m-1">
              <Listbox.Button className="relative w-full h-10 cursor-default rounded-lg bg-slate-600 text-left pl-3 shadow-md focus:outline-none text-gray-100">
                <span className="block truncate">{transactionType}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex pr-1 items-center">
                  <ChevronUpDownIcon className="h-5 w-5" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 bg-gray-900 bg-opacity-80 w-full rounded-md overflow-auto p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
                  {Object.entries(TransactionType).map(([key, value], index) => (
                    <Listbox.Option key={index} value={enumFrom(key)} className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md hover:bg-gray-500 hover:opacity-80`}>
                      {({ selected }) => (
                        <>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                        ): null}
                          {value}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div>
        <CreditRow />
      </div>
      <div className="flex m-5">
        <button className="rounded-md h-10 w-24 text-base text-white bg-green-700 hover:bg-green-600 active:bg-green-500 transition duration-150 ease-in-out">
          Submit
        </button>
      </div>
    </>
  );
};

export default NewMoneyPage;
