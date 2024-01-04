import { useEffect, useState } from "react"
import Snackbar from "../utils/Snackbar/Snackbar"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Entity } from "../../types/Api"
import ReminderCmp from "./Reminder"
import { Reminder } from "../../types/Reminder"

const Reminders = () => {
  const [oustandingReminders, setOutstandingReminders] = useState<
    Entity<Reminder>[]
  >([])

  const [standingOrderReminderIsOpen, setStandingOrderReminderIsOpen] =
    useState(true)

  const closeStandingOrderReminder = () => {
    setStandingOrderReminderIsOpen(false)
  }

  const { data } = useQuery<Entity<Reminder>[]>({
    queryKey: ["getOutstandingReminders"],
    queryFn: async () => {
      const response = await axios.get("/api/reminders")
      return response.data
    }
  })

  useEffect(() => {
    if (data) {
      setOutstandingReminders(data)
    }
  }, [data])

  const reminderToRender =
    oustandingReminders.length > 0 ? oustandingReminders[0] : undefined

  useEffect(() => {
    console.log(oustandingReminders)
  }, [oustandingReminders])

  return (
    <>
      {reminderToRender && (
        <Snackbar isOpen={standingOrderReminderIsOpen}>
          <ReminderCmp
            text={reminderToRender.domain.description}
            onSuccess={closeStandingOrderReminder}
            onCross={closeStandingOrderReminder}
          />
        </Snackbar>
      )}
    </>
  )
}

export default Reminders
