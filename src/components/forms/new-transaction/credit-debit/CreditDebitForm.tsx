import { FC, useEffect, useState } from "react"
import useFormControl from "../../../../hooks/useFormControl"
import { validateCreditDebit } from "../validation"
import CreditDebitRow from "./CreditDebitRow"
import FormButtons from "../FormButtons"
import {
  CreditDebit,
  ReceiptTransaction,
  ValidationErrors,
} from "../../../../types/NewMoney"
import Spinner from "../../../utils/Spinner"
import Button from "../../../button/Button"
import TextArea from "../../../inputs/TextArea"
import Input from "../../../inputs/Input"
import useReferenceData from "../../../../hooks/useReferenceData"
import {
  flagNewDescriptions,
  formatSainsburysTransactions,
  formatWaitroseTransactions,
  parseSainsburysTransaction,
  receiptTransactionToCreditDebit,
} from "./upload-receipt"
import NewDescriptionMapping from "./NewDescriptionMapping"
import { today } from "../../../../utils/constants"
import Dialog from "../../../utils/Dialog"
import { emptyCreditDebit, emptyCreditDebitErrors } from "./defaults"

interface CreditDebitFormProps {
  transactionType: "credit" | "debit"
}

const CreditDebitForm: FC<CreditDebitFormProps> = ({ transactionType }) => {
  const [receiptModalIsOpen, setReceiptModalIsOpen] = useState(false)
  const [receiptModalContent, setReceiptModalContent] = useState("")
  const [receiptDate, setReceiptDate] = useState(today)
  const [receiptModalStage, setReceiptModalStage] = useState(0)
  const [receiptTransactions, setReceiptTransactions] = useState<
    ReceiptTransaction[]
  >([])

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
    isLoading,
  } = useFormControl(
    emptyCreditDebit,
    emptyCreditDebitErrors(),
    validateCreditDebit,
    transactionType
  )

  const {
    descriptions,
    uniqueDescriptions,
    addNewDescriptionMapping,
    shortDescriptionFrom,
  } = useReferenceData()

  const processReceiptTransactions = (transactions: ReceiptTransaction[]) => {
    const flaggedTransactions = flagNewDescriptions(descriptions, transactions)
    setReceiptTransactions(flaggedTransactions)
  }

  const handleUploadSainsburysReceipt = () => {
    processReceiptTransactions(
      formatSainsburysTransactions(receiptModalContent).map((transaction) =>
        parseSainsburysTransaction(transaction)
      )
    )
  }

  const handleUploadWaitroseReceipt = () => {
    processReceiptTransactions(formatWaitroseTransactions(receiptModalContent))
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
    setReceiptTransactions((prevState) =>
      prevState.map((transaction) => ({
        ...transaction,
        description: shortDescriptionFrom(transaction.description),
        isNewDescription: false,
      }))
    )
  }

  const firstReceiptModal = () => (
    <>
      <div className="mt-4 mx-8">
        <Input
          value={receiptDate}
          type="date"
          onChange={(e) => setReceiptDate(e)}
          className="w-full"
        />
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

  const secondReceiptModal = () => (
    <>
      <div className="mt-2">
        <TextArea onChange={(content) => setReceiptModalContent(content)} />
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          value="Upload Waitrose"
          className="w-40"
          onClick={handleUploadWaitroseReceipt}
        />
        <Button
          value="Upload Sainsbury's"
          className="w-40"
          onClick={handleUploadSainsburysReceipt}
        />
        <Button value="Back" onClick={() => setReceiptModalStage(0)} />
      </div>
    </>
  )

  const receiptModalComponents = [firstReceiptModal(), secondReceiptModal()]

  const areNewTransactions =
    receiptTransactions.filter((transaction) => transaction.isNewDescription)
      .length > 0

  useEffect(() => {
    if (!areNewTransactions && receiptTransactions.length > 0) {
      overrideTransactions(
        receiptTransactions.map((transaction) =>
          receiptTransactionToCreditDebit(transaction, "Food", receiptDate)
        )
      )
      setReceiptModalIsOpen(false)
    }
    // eslint-disable-next-line
  }, [receiptTransactions, areNewTransactions])

  const dialogBody = () =>
    areNewTransactions ? (
      <NewDescriptionMapping
        onCreate={addNewDescriptionMapping}
        options={uniqueDescriptions}
        transactions={receiptTransactions}
        finishReceiptUpload={finishReceiptUpload}
        addNewDescriptionMapping={addNewDescriptionMapping}
      />
    ) : (
      receiptModalComponents[receiptModalStage]
    )

  return (
    <>
      <div>
        {transactions.map((_transaction, index) => (
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
      <Spinner isOpen={isLoading} />
      <Dialog
        open={receiptModalIsOpen}
        setOpen={setReceiptModalIsOpen}
        onClose={handleClose}
        title={"Upload Receipt"}
      >
        {dialogBody()}
      </Dialog>
    </>
  )
}

export default CreditDebitForm
