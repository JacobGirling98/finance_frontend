import { FC } from "react"
import PageTitle from "../../components/utils/PageTitle"
import Transactions from "./Transactions/Transactions"
import useTabs, { TabElement } from "../../hooks/useTabs/useTabs"
import Headlines from "./Headlines/Headlines"

const ViewMoneyPage: FC = () => {
  const tabElements: TabElement[] = [
    { tabTitle: "Transactions", body: <Transactions /> },
    { tabTitle: "Summary", body: <Headlines /> }
  ]

  const { tabs, body } = useTabs(tabElements)

  return (
    <>
      <div className="flex px-5 pt-5">
        <PageTitle title={"View Money"} />
        <div className="flex ml-12">{tabs}</div>
      </div>
      <div className="mx-2 mb-2 p-2">{body}</div>
    </>
  )
}

export default ViewMoneyPage
