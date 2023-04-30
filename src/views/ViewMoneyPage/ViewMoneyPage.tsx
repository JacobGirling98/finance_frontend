import { FC, useState } from "react";
import PageTitle from "../../components/utils/PageTitle";
import HeadlineCard from "../../components/card/HeadlineCard/HeadlineCard";
import { Period, periods } from "../../types/ViewMoney";
import UnionSelect from "../../components/inputs/select/UnionSelect";

const ViewMoneyPage: FC = () => {
  // const [transactionType, setTransactionType] = useState<TransactionType>(
  //   TransactionType.DEBIT
  // );
  const [period, setPeriod] = useState<Period>("Fiscal Month");
  // const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <>
      <div className="flex">
        <PageTitle title={"View Money"} />
        <div className="ml-auto flex">
          <div className="w-72">
            <UnionSelect
              value={period}
              onChange={setPeriod}
              options={periods}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <HeadlineCard title="Income" value={3000} />
        <HeadlineCard title="Spending" value={1500} />
        <HeadlineCard title="Net" value={1500} />
        <HeadlineCard title="Savings" value={500} />
      </div>
    </>
  );
};

export default ViewMoneyPage;
