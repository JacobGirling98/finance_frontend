import { ReactElement, useState } from "react"
import { TransactionType } from "../../types/NewMoney"
import CreditDebitForm from "../../components/forms/new-transaction/credit-debit/CreditDebitForm"
import BankTransferForm from "../../components/forms/new-transaction/bank-transfer/BankTransferForm"
import PersonalTransferForm from "../../components/forms/new-transaction/personal-transfer/PersonalTransferForm"
import IncomeForm from "../../components/forms/new-transaction/income/IncomeForm"
import PageTitle from "../../components/utils/PageTitle"
import TransactionTypeSelect from "../../components/inputs/select/TransactionTypeSelect"

const NewMoneyPage = () => {
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

  return (
    <>
      <div className="flex mt-5 mx-5">
        <PageTitle title="Add Transaction">
          <>
            <span> - </span>
            <span className="text-special-light">{transactionType}</span>
          </>
        </PageTitle>
        <div className="ml-auto my-auto w-72">
          <TransactionTypeSelect
            value={transactionType}
            setValue={setTransactionType}
          />
        </div>
      </div>
      {renderBody()}
    </>
  )
}

export default NewMoneyPage
