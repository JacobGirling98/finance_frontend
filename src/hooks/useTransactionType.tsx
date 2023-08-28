import { useState, ReactElement } from "react"
import BankTransferForm from "../components/forms/new-transaction/bank-transfer/BankTransferForm"
import CreditDebitForm from "../components/forms/new-transaction/credit-debit/CreditDebitForm"
import IncomeForm from "../components/forms/new-transaction/income/IncomeForm"
import PersonalTransferForm from "../components/forms/new-transaction/personal-transfer/PersonalTransferForm"
import { TransactionType } from "../types/NewMoney"

const useTransactionType = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.CREDIT
  )

  const renderBody = (): ReactElement => {
    switch (transactionType) {
      case TransactionType.CREDIT:
        return <CreditDebitForm transactionType="credit" />
      case TransactionType.DEBIT:
        return <CreditDebitForm transactionType="debit" />
      case TransactionType.BANK_TRANSFER:
        return <BankTransferForm />
      case TransactionType.PERSONAL_TRANSFER:
        return <PersonalTransferForm />
      case TransactionType.INCOME:
        return <IncomeForm />
    }
  }

  return {
    transactionType,
    setTransactionType,
    body: renderBody()
  }
}

export default useTransactionType