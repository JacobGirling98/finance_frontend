import { StoryObj, Meta } from "@storybook/react"
import Reminder from "./Reminder"

const meta: Meta<typeof Reminder> = {
  title: "Reminder",
  component: Reminder
}

// eslint-disable-next-line react-refresh/only-export-components
export default meta

type Story = StoryObj<typeof Reminder>

export const Primary: Story = {
  args: {
    text: "Check standing orders"
  },
  argTypes: {
    onSuccess: { action: "Clicked Success" },
    onCross: { action: "Clicked Cross" }
  }
}
