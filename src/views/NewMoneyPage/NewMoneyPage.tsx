import React, { useState } from "react";
import { Listbox } from "@headlessui/react";

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
    <div className="flex bg-blue-400">
      <h1 className="text-white mx-5 my-1 italic text- text-4xl">
        Add Transaction - {transactionType}
      </h1>
      <div className="ml-auto w-72 mx-5">
        <Listbox value={transactionType} onChange={setTransactionType}>
          <div className="relative m-1">
            <Listbox.Button className="relative w-full h-full cursor-default rounded-lg bg-white text-left pl-3 shadow-md focus:outline-none ">
              {transactionType}
              </Listbox.Button>
            <Listbox.Options>
              {Object.entries(TransactionType).map(([key, value], index) => (
                <Listbox.Option key={index} value={enumFrom(key)}>
                  {value}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default NewMoneyPage;
