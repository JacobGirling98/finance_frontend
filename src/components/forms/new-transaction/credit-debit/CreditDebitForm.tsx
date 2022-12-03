import React, {FC, Fragment, useEffect, useState} from "react";
import useFormControl from "../../../../hooks/useFormControl";
import {validateCreditDebit} from "../validation";
import CreditDebitRow from "./CreditDebitRow";
import FormButtons from "../FormButtons";
import {CreditDebit, ReceiptTransaction, ValidationErrors} from "../../../../types/NewMoney";
import Spinner from "../../../utils/Spinner";
import {Dialog, Transition} from "@headlessui/react";
import ExitButton from "../../../button/ExitButton";
import Button from "../../../button/Button";
import TextArea from "../../../inputs/TextArea";
import Input from "../../../inputs/Input";
import useReferenceData from "../../../../hooks/useReferenceData";
import {
  flagNewDescriptions,
  formatTransactions,
  parseSainsburysTransaction,
  receiptTransactionToCreditDebit
} from "./upload-receipt";
import NewDescriptionMapping from "./NewDescriptionMapping";
import {today} from "../../../../utils/constants";

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
}

const emptyCreditDebit = (date: string, category: string): CreditDebit => ({
  ...({
    category, date, description: "", quantity: 0, value: 0
  })
})

const emptyCreditDebitErrors = (): ValidationErrors<CreditDebit> => ({
  ...({
    category: "", date: "", description: "", quantity: "", value: ""
  })
})

const CreditDebitForm: FC<CreditDebitFormProps> = (
  {
    transactionType
  }
) => {
  const [receiptModalIsOpen, setReceiptModalIsOpen] = useState(false)
  const [receiptModalContent, setReceiptModalContent] = useState("")
  const [receiptDate, setReceiptDate] = useState(today)
  const [receiptModalStage, setReceiptModalStage] = useState(0)
  const [receiptTransactions, setReceiptTransactions] = useState<ReceiptTransaction[]>([])

  const {
    transactions,
    validationErrors,
    addTransaction,
    clearTransactions,
    deleteRow,
    changeTransaction,
    submitTransactions,
    onlyOneRow,
    overrideTransactions,
    isLoading
  } = useFormControl(emptyCreditDebit, emptyCreditDebitErrors(), validateCreditDebit, transactionType)

  const {
    descriptions,
    uniqueDescriptions,
    addNewDescriptionMapping,
    shortDescriptionFrom
  } = useReferenceData()

  const handleUploadSainsburysReceipt = () => {
    const transactions = formatTransactions(receiptModalContent).map(transaction => parseSainsburysTransaction(transaction))
    const flaggedTransactions = flagNewDescriptions(descriptions, transactions)
    setReceiptTransactions(flaggedTransactions)
  }

  const handleClose = () => {
    setReceiptModalIsOpen(false)
    setReceiptDate(today)
    setReceiptTransactions([])
    setReceiptModalContent("")
    setReceiptModalStage(0)
  }

  const finishReceiptUpload = () => {
    setReceiptModalIsOpen(false)
    setReceiptTransactions(prevState => prevState.map(transaction => ({
      ...transaction,
      description: shortDescriptionFrom(transaction.description),
      isNewDescription: false
    })))
  }

  const firstReceiptModal = () =>
    (
      <>
        <div className="mt-4 mx-8">
          <Input value={receiptDate} type="date" onChange={(e) => setReceiptDate(e)} className="w-full"/>
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            value="Next"
            onClick={() => setReceiptModalStage(1)}
            className="transition-none"
          />
        </div>
      </>
    )

  const secondReceiptModal = () =>
    (
      <>
        <div className="mt-2">
          <TextArea onChange={(content) => setReceiptModalContent(content)}/>
        </div>
        <div className="mt-4 flex justify-center">
          <Button value="Upload Waitrose" className="w-40"/>
          <Button value="Upload Sainsbury's" className="w-40" onClick={handleUploadSainsburysReceipt}/>
          <Button value="Back" onClick={() => setReceiptModalStage(0)}/>
        </div>
      </>
    )

  const receiptModalComponents = [
    firstReceiptModal(),
    secondReceiptModal()
  ]

  const areNewTransactions = receiptTransactions.filter(transaction => transaction.isNewDescription).length > 0

  useEffect(() => {
    if (!areNewTransactions && receiptTransactions.length > 0) {
      overrideTransactions(receiptTransactions.map(transaction => receiptTransactionToCreditDebit(
        transaction,
        "Food",
        receiptDate
      )))
      setReceiptModalIsOpen(false)
    }
  }, [receiptTransactions, areNewTransactions])

  return (
    <>
      <div>
        {transactions.map((transaction, index) => (
          <CreditDebitRow
            data={transactions[index]}
            index={index}
            handleDelete={deleteRow}
            isLastRow={onlyOneRow}
            handleChange={changeTransaction}
            errors={validationErrors[index]}
            focusValueInput={transactions.length > 1}
            key={index}
          />
        ))}
      </div>
      <div className="flex m-5">
        <FormButtons
          handleSubmit={submitTransactions}
          handleAddTransaction={addTransaction}
          handleClear={clearTransactions}
          handleUploadReceipt={() => setReceiptModalIsOpen(true)}
          transactionType={transactionType}
        />
      </div>
      <Spinner isOpen={isLoading}/>
      <Transition appear show={receiptModalIsOpen} as={Fragment} afterLeave={handleClose}>
        <Dialog as="div" className="relative z-10" onClose={() => setReceiptModalIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"/>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-visible rounded-2xl bg-background-dark-main p-6 text-left align-middle shadow-xl transition-all"
                >
                  <ExitButton onClick={() => setReceiptModalIsOpen(false)} className="fixed right-3"/>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Upload Receipt
                  </Dialog.Title>
                  {areNewTransactions
                    ? <NewDescriptionMapping
                      onCreate={addNewDescriptionMapping}
                      options={uniqueDescriptions}
                      transactions={receiptTransactions}
                      finishReceiptUpload={finishReceiptUpload}
                      addNewDescriptionMapping={addNewDescriptionMapping}
                    />
                    : receiptModalComponents[receiptModalStage]
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CreditDebitForm