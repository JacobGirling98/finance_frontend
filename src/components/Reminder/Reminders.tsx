import { useEffect, useState } from "react"
import Snackbar from "../utils/Snackbar/Snackbar"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Entity } from "../../types/Api"
import ReminderCmp from "./Reminder"
import { Reminder } from "../../types/Reminder"

const Reminders = () => {
  const [outstandingReminders, setOutstandingReminders] = useState<
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

  const { mutate } = useMutation({
    mutationKey: ["advanceReminder"],
    mutationFn: async (id: string) => {
      await axios.post("/api/reminders/advance", { id })
    }
  })

  useEffect(() => {
    if (data) {
      setOutstandingReminders(data)
    }
  }, [data])

  const reminderToRender =
    outstandingReminders.length > 0 ? outstandingReminders[0] : undefined

  const onSuccess = () => {
    if (reminderToRender) {
      mutate(reminderToRender.id)
      setOutstandingReminders((reminders) => reminders.slice(1))
    }
  }

  const onCross = () => {
    if (outstandingReminders.length > 0) {
      setOutstandingReminders((reminders) => reminders.slice(1))
    }
  }

  return (
    <>
      {reminderToRender && (
        <Snackbar isOpen={standingOrderReminderIsOpen}>
          <ReminderCmp
            text={reminderToRender.domain.description}
            onSuccess={onSuccess}
            onCross={onCross}
          />
        </Snackbar>
      )}
    </>
  )
}

export default Reminders
