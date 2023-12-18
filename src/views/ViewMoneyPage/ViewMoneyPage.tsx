import { FC, useState } from "react"
import PageTitle from "../../components/utils/PageTitle"
import { Period, periods } from "../../types/ViewMoney"
import UnionSelect from "../../components/inputs/select/UnionSelect"
import Transactions from "./Transactions"

const ViewMoneyPage: FC = () => {
  // const [transactionType, setTransactionType] = useState<TransactionType>(
  //   TransactionType.DEBIT
  // );
  const [period, setPeriod] = useState<Period>("Fiscal Month")
  // const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <>
      <div className="flex px-5 pt-5">
        <PageTitle title={"View Money"} />
        <div className="ml-auto flex items-center">
          <div className="w-72">
            <UnionSelect
              value={period}
              onChange={setPeriod}
              options={periods}
            />
          </div>
        </div>
      </div>
      <div className="mx-2 mb-2 p-2">
        <Transactions />
      </div>
    </>
  )
}

export default ViewMoneyPage
