import HeadlineCard from "../../../components/card/HeadlineCard/HeadlineCard"

const Headlines = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <HeadlineCard title="Income" value={3000} />
      <HeadlineCard title="Spending" value={1500} />
      <HeadlineCard title="Net" value={1500} />
      <HeadlineCard title="Savings" value={500} />
    </div>
  )
}

export default Headlines
