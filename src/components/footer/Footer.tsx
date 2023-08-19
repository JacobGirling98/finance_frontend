import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../utils/constants"
import { useQuery } from "react-query"

const Footer = () => {
  const [date, setDate] = useState<Date>()

  useQuery<string>(
    "getLastLogin",
    async () => {
      const response = await axios.get(`${BASE_URL}/last-login`)
      return response.data
    },
    {
      onSuccess: (login) => {
        setDate(new Date(parseDate(login)))
      },
    }
  )

  const parseDate = (date: string): Date => {
    const parts = date.split("-")
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const day = parseInt(parts[2], 10)
    return new Date(year, month, day)
  }

  return (
    <footer className="bottom-0 left-0 bg-slate-300 dark:bg-zinc-700 min-w-full">
      {date && (
        <div className="flex justify-end text-text-light dark:text-text-dark px-2">
          <p>Last Login: {date.toDateString()}</p>
        </div>
      )}
    </footer>
  )
}

export default Footer
