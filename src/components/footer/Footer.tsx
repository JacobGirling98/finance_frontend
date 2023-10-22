import axios from "axios"
import { BASE_URL } from "../../utils/constants"
import { useQuery } from "react-query"

const Footer = () => {
  const parseDate = (date: string): Date => {
    const parts = date.split("-")
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const day = parseInt(parts[2], 10)
    return new Date(year, month, day)
  }

  const { data: loginData } = useQuery<string>("getLastLogin", async () => {
    const response = await axios.get(`${BASE_URL}/last-login`)
    return response.data
  })

  const login = loginData ? new Date(parseDate(loginData)) : undefined

  const { data: transactionData } = useQuery<string>(
    "getLastTransaction",
    async () => {
      const response = await axios.get(`${BASE_URL}/last-transaction`)
      return response.data
    }
  )

  const transaction = transactionData
    ? new Date(parseDate(transactionData))
    : undefined

  return (
    <footer className="bottom-0 left-0 bg-slate-300 dark:bg-zinc-700 min-w-full">
      {login && transaction && (
        <div className="flex justify-end text-text-light dark:text-text-dark px-2 space-x-4">
          <p>Last Login: {login.toDateString()}</p>
          <div className="border-l w-0 my-1 border-text-light dark:border-text-dark"/>
          <p>Last Transaction: {transaction.toDateString()}</p>
        </div>
      )}
    </footer>
  )
}

export default Footer
