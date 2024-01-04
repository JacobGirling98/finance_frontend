import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid"

interface ReminderProps {
  text: string
  onSuccess: () => void
  onCross: () => void
}

const Reminder = ({ text, onSuccess, onCross }: ReminderProps) => {
  return (
    <>
      <div className="rounded-md flex bg-slate-300 dark:bg-zinc-600 p-2 space-x-6 ring-1 ring-special-light dark:ring-special-dark">
        <p className="text-text-light dark:text-text-dark ml-2">{text}</p>
        <div className="ml-auto flex h-full my-auto space-x-2">
          <button onClick={onSuccess} className="group" data-testid="tick">
            <CheckIcon
              className="h-6 w-6 text-text-light dark:text-text-dark group-hover:text-text-soft-light dark:group-hover:text-text-soft-dark group-active:text-text-strong-light dark:group-active:text-text-strong-dark"
              aria-hidden="true"
            />
          </button>
          <button onClick={onCross} className="group" data-testid="cross">
            <XMarkIcon
              className="h-6 w-6 text-text-light dark:text-text-dark group-hover:text-text-soft-light dark:group-hover:text-text-soft-dark group-active:text-text-strong-light dark:group-active:text-text-strong-dark"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default Reminder
