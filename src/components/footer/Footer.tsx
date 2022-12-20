import React, {useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {baseUrl} from "../../utils/constants";

const Footer = () => {

 const [date, setDate] = useState<Date>()

  useQuery<string>("getLastLogin", async () => {
    const response = await axios.get(`${baseUrl}/last-login`)
    return response.data
  }, {
    onSuccess: login => {
      setDate(new Date(login))
    }
  })

  return (
    <footer className="bottom-0 left-0 bg-mark-light dark:bg-mark-dark min-w-full">
      {date && (
        <div className="flex justify-end text-text-light dark:text-text-dark px-2">
          <p>Last Login: {date.toDateString()}</p>
        </div>
      )}
    </footer>
  )
}

export default Footer