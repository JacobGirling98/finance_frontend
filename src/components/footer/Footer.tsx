import React, {useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {BASE_URL} from "../../utils/constants";

const Footer = () => {

 const [date, setDate] = useState<Date>()

  useQuery<string>("getLastLogin", async () => {
    const response = await axios.get(`${BASE_URL}/last-login`)
    return response.data
  }, {
    onSuccess: login => {
      setDate(new Date(login))
    }
  })

  return (
    <footer className="absolute block bottom-0 left-0 bg-gray-300 dark:bg-slate-700 min-w-full">
      {date && (
        <div className="flex justify-end text-black dark:text-slate-300 px-2">
          <p>Last Login: {date.toDateString()}</p>
        </div>
      )}
    </footer>
  )
}

export default Footer