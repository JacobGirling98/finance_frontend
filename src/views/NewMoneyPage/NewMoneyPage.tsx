import PageTitle from "../../components/utils/PageTitle"
import TransactionTypeSelect from "../../components/inputs/select/TransactionTypeSelect"
import useTransactionType from "../../hooks/useTransactionType"

const NewMoneyPage = () => {
  const { transactionType, setTransactionType, body } = useTransactionType()

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
      {body}
    </>
  )
}

export default NewMoneyPage
