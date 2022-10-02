import React, {Fragment, ReactElement, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import CreditDebitRow from "../../components/forms/CreditDebitRow";
import FormButton from "../../components/button/FormButton";
import BankTransferRow from "../../components/forms/BankTransferRow";
import PersonalTransferRow from "../../components/forms/PersonalTransferRow";
import IncomeRow from "../../components/forms/IncomeRow";
import {
  BankTransfer,
  CreditDebit,
  Income,
  PersonalTransfer,
  Transaction,
  transactionFields,
  TransactionType,
  ValidationErrors
} from "../../types/NewMoney";
import {
  emptyBankTransfer,
  emptyBankTransferErrors,
  emptyCreditDebit,
  emptyCreditDebitErrors,
  emptyIncome,
  emptyIncomeErrors,
  emptyPersonalTransfer,
  emptyPersonalTransferErrors
} from "../../utils/defaults";
import {validate} from "../../utils/validation";


const NewMoneyPage = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.CREDIT
  );
  const [transactions, setTransactions] = useState<Transaction[]>([emptyCreditDebit()]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<Transaction>[]>([emptyCreditDebitErrors()])

  const handleAddTransaction = () => {
    setTransactions(state => [...state, emptyTransaction()])
    setValidationErrors(state => [...state, emptyTransactionErrors()])
  }

  const handleClear = (type: TransactionType) => {
    setTransactions([emptyTransaction(type)])
    setValidationErrors([emptyTransactionErrors(type)])
  }

  const handleDeleteRow = (index: number) => {
    setTransactions(state => state.filter((_, i) => i !== index))
    setValidationErrors(state => state.filter((_, i) => i !== index))
  }

  const handleTransactionChange = (index: number, value: string | number, field: transactionFields) => {
    let changedTransactions: Transaction[] = transactions;
    (changedTransactions[index] as Record<typeof field, typeof value>)[field] =
      value;
    setTransactions([...changedTransactions]);
  }

  const handleTransactionTypeChange = (value: TransactionType) => {
    handleClear(value)
    setTransactionType(value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const errors: ValidationErrors<Transaction>[] = transactions.map(transaction => {
      return validate(transaction, transactionType)
    })
    if (errors.flatMap(error => Object.entries(error).map(([_, value]) => value !== "")).includes(true)) {
      setValidationErrors(errors)
      return
    }

  }

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

  const emptyTransaction = (type: TransactionType = transactionType): Transaction => {
    switch (type) {
      case TransactionType.CREDIT:
        return emptyCreditDebit();
      case TransactionType.DEBIT:
        return emptyCreditDebit();
      case TransactionType.BANK_TRANSFER:
        return emptyBankTransfer();
      case TransactionType.PERSONAL_TRANSFER:
        return emptyPersonalTransfer();
      case TransactionType.INCOME:
        return emptyIncome()
    }
  };

  const emptyTransactionErrors = (type: TransactionType = transactionType): ValidationErrors<Transaction> => {
    switch (type) {
      case TransactionType.CREDIT:
        return emptyCreditDebitErrors();
      case TransactionType.DEBIT:
        return emptyCreditDebitErrors();
      case TransactionType.BANK_TRANSFER:
        return emptyBankTransferErrors();
      case TransactionType.PERSONAL_TRANSFER:
        return emptyPersonalTransferErrors();
      case TransactionType.INCOME:
        return emptyIncomeErrors()
    }
  };

  const renderBody = (index: number): ReactElement => {
    switch (transactionType) {
      case TransactionType.CREDIT:
        return <CreditDebitRow
          key={index}
          data={transactions[index] as CreditDebit}
          index={index}
          handleDelete={handleDeleteRow}
          isLastRow={onlyOneRow}
          handleChange={handleTransactionChange}
          errors={validationErrors[index] as ValidationErrors<CreditDebit>}
        />;
      case TransactionType.DEBIT:
        return <CreditDebitRow
          key={index}
          data={transactions[index] as CreditDebit}
          index={index}
          handleDelete={handleDeleteRow}
          isLastRow={onlyOneRow}
          handleChange={handleTransactionChange}
          errors={validationErrors[index] as ValidationErrors<CreditDebit>}
        />;
      case TransactionType.BANK_TRANSFER:
        return <BankTransferRow
          key={index}
          data={transactions[index] as BankTransfer}
          index={index}
          handleDelete={handleDeleteRow}
          isLastRow={onlyOneRow}
          handleChange={handleTransactionChange}

        />;
      case TransactionType.PERSONAL_TRANSFER:
        return <PersonalTransferRow
          key={index}
          data={transactions[index] as PersonalTransfer}
          index={index}
          handleDelete={handleDeleteRow}
          isLastRow={onlyOneRow}
          handleChange={handleTransactionChange}
        />;
      case TransactionType.INCOME:
        return <IncomeRow
          key={index}
          data={transactions[index] as Income}
          index={index}
          handleDelete={handleDeleteRow}
          isLastRow={onlyOneRow}
          handleChange={handleTransactionChange}/>
    }
  };

  const onlyOneRow = transactions.length === 1

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <h1 className="text-white mx-5 my-1 text- text-4xl">
            <span className="italic">Add Transaction</span>
            <span>{` - ${transactionType}`}</span>
          </h1>
          <div className="ml-auto w-72 mx-5">
            <Listbox value={transactionType} onChange={handleTransactionTypeChange}>
              <div className="relative m-1">
                <Listbox.Button
                  className="relative w-full h-10 cursor-default rounded-lg bg-slate-600 text-left pl-3 shadow-md focus:outline-none text-gray-100">
                  <span className="block truncate">{transactionType}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex pr-1 items-center">
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
                    className="absolute mt-1 max-h-60 bg-gray-900 bg-opacity-80 backdrop-blur-md w-full z-10 rounded-md overflow-auto p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
                    {Object.entries(TransactionType).map(
                      ([key, value], index) => (
                        <Listbox.Option
                          key={index}
                          value={enumFrom(key)}
                          className={() =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md hover:bg-gray-500 hover:opacity-80`
                          }
                        >
                          {({selected}) => (
                            <>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
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
        <div>
          {transactions.map((transaction, index) => renderBody(index))}
        </div>
        <div className="flex m-5">
          <FormButton
            value="Submit"
            className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-600 ring-indigo-800"
            type="submit"
          />
          <FormButton
            value="Add Row"
            className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 ring-indigo-800"
            onClick={handleAddTransaction}
            type="button"
          />
          <FormButton
            value="Clear"
            onClick={() => handleClear(transactionType)}
            className="bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 ring-indigo-800"
            type="button"
          />
          <FormButton
            value="Upload Receipt"
            onClick={handleAddTransaction}
            className="w-32 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 ring-indigo-800"
            type="button"
          />
        </div>
      </form>
    </>
  );
};

export default NewMoneyPage;
