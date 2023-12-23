interface TabProps {
  content: string
  active: boolean
  setActive: () => void
}

const Tab = ({ content, active, setActive }: TabProps) => {
  return (
    <>
      <button
        className={`${
          active ? "border-solid" : "border-[transparent]"
        } border-special-light dark:border-special-dark
        border-b-2
        hover:border-solid hover:border-special-hover-light hover:dark:border-special-hover-dark
        active:border-solid active:border-special-active-light active:dark:border-special-active-dark
        h-10`}
        onClick={setActive}
      >
        <div className="text-text-light dark:text-text-dark">{content}</div>
      </button>
    </>
  )
}

export default Tab
