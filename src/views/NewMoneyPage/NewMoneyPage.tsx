import React, {Fragment, ReactElement, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {TransactionType} from "../../types/NewMoney";
import CreditDebitForm from "../../components/forms/new-transaction/credit-debit/CreditDebitForm";
import BankTransferForm from "../../components/forms/new-transaction/bank-transfer/BankTransferForm";
import PersonalTransferForm from "../../components/forms/new-transaction/personal-transfer/PersonalTransferForm";
import IncomeForm from "../../components/forms/new-transaction/income/IncomeForm";


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

  const renderBody = (): ReactElement => {
    switch (transactionType) {
      case TransactionType.CREDIT:
        return <CreditDebitForm transactionType="credit"/>;
      case TransactionType.DEBIT:
        return <CreditDebitForm transactionType="debit"/>;
      case TransactionType.BANK_TRANSFER:
        return <BankTransferForm/>;
      case TransactionType.PERSONAL_TRANSFER:
        return <PersonalTransferForm/>;
      case TransactionType.INCOME:
        return <IncomeForm/>
    }
  };

  return (
    <>
      <div className="flex">
        <h1 className="mx-5 my-1 text-4xl text-text-soft-light text- dark:text-text-soft-dark">
          <span className="italic">Add Transaction</span>
          <span> - </span>
          <span className="text-special-light">{transactionType}</span>
        </h1>
        <div className="mx-5 ml-auto w-72">
          <Listbox value={transactionType} onChange={setTransactionType}>
            <div className="relative m-1">
              <Listbox.Button
                className="relative w-full h-10 cursor-default rounded-lg
                  bg-input-light dark:bg-input-dark
                  text-text-light dark:text-text-dark
                  text-left pl-3 shadow-lg focus:outline-none "
              >
                <span className="block truncate">{transactionType}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                  <ChevronUpDownIcon className="h-5 w-5"/>
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
                  focus:outline-none shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-md">
                  {Object.entries(TransactionType).map(
                    ([key, value], index) => (
                      <Listbox.Option
                        key={index}
                        value={enumFrom(key)}
                        className={() =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md 
                          hover:bg-special-light dark:hover-bg-special-dark 
                          hover:text-special-text-light dark:hover:text-special-text-dark
                          hover:opacity-80`
                        }
                      >
                        {({selected}) => (
                          <>
                            {selected ? (
                              <span
                                className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                            {value}
                          </>
                        )}
                      </Listbox.Option>
                    )
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      {renderBody()}
    </>
  );
};

export default NewMoneyPage;
