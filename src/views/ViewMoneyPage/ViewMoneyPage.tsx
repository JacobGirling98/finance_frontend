import React, {FC, useState} from "react";
import PageTitle from "../../components/utils/PageTitle";
import HeadlineCard from "../../components/card/HeadlineCard/HeadlineCard";
import TypeableSelect from "../../components/inputs/TypeableSelect";
import {TransactionType} from "../../types/NewMoney";
import {DateRange, Period} from "../../types/ViewMoney";

const ViewMoneyPage: FC = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.DEBIT)
  const [period, setPeriod] = useState<Period>("fiscal-month")
  const [dateRange, setDateRange] = useState<DateRange>()

  return (
    <>
      <div className="flex">
        <PageTitle title={"View Money"} />
        <div className="ml-auto flex">

        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <HeadlineCard title="Income" value={3000} />
        <HeadlineCard title="Spending" value={1500} />
        <HeadlineCard title="Net" value={1500} />
        <HeadlineCard title="Savings" value={500} />
      </div>
    </>
  )
}

export default ViewMoneyPage;