interface TabProps {
  content: string
  active: boolean
  onClick: () => void
  className?: string
}

const Tab = ({ content, active, onClick, className }: TabProps) => {
  return (
    <>
      <button
        className={`group border-b-2 ${
          active ? "" : "border-opacity-0 dark:border-opacity-0"
        } border-special-light dark:border-special-dark
        hover:border-solid hover:border-special-hover-light hover:dark:border-special-hover-dark
        active:border-solid active:border-special-active-light active:dark:border-special-active-dark
        h-10 px-2
        ${className}`}
        onClick={onClick}
      >
        <div className="text-text-light dark:text-text-dark group-hover:scale-105 group-active:scale-105 transition-transform duration-75">
          {content}
        </div>
      </button>
    </>
  )
}

export default Tab
