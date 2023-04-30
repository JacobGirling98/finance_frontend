import React, {useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../../utils/constants";
import {useQuery} from "react-query";

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
    <footer className="bottom-0 left-0 bg-bg-hover-light dark:bg-bg-hover-dark min-w-full">
      {date && (
        <div className="flex justify-end text-text-light dark:text-text-dark px-2">
          <p>Last Login: {date.toDateString()}</p>
        </div>
      )}
    </footer>
  )
}

export default Footer