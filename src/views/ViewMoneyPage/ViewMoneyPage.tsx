import React, { FC, useState } from "react";
import PageTitle from "../../components/utils/PageTitle";
import HeadlineCard from "../../components/card/HeadlineCard/HeadlineCard";
import { TransactionType } from "../../types/NewMoney";
import { DateRange, Period, periods } from "../../types/ViewMoney";
import TransactionTypeSelect from "../../components/inputs/select/TransactionTypeSelect";
import UnionSelect from "../../components/inputs/select/UnionSelect";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const ViewMoneyPage: FC = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.DEBIT)
  const [period, setPeriod] = useState<Period>("Fiscal Month")
  const [dateRange, setDateRange] = useState<DateRange>()

  const {data, isLoading} = useQuery<DateRange[]>(["get date ranges", period], async () => {
    const response = await axios.get(`${BASE_URL}/reference/fiscal-months`)
    return response.data
  })

  return (
    <>
      <div className="flex">
        <PageTitle title={"View Money"}/>
        <div className="ml-auto flex">
          <div className="w-72">
            <UnionSelect value={period} onChange={setPeriod} options={periods}/>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <HeadlineCard title="Income" value={3000}/>
        <HeadlineCard title="Spending" value={1500}/>
        <HeadlineCard title="Net" value={1500}/>
        <HeadlineCard title="Savings" value={500}/>
      </div>
    </>
  )
}

export default ViewMoneyPage;