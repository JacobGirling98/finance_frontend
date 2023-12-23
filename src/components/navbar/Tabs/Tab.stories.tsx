import { Meta, StoryObj } from "@storybook/react"
import Tab from "./Tab"

const meta: Meta<typeof Tab> = {
  title: "Tab Component",
  component: Tab
}

// eslint-disable-next-line react-refresh/only-export-components
export default meta

type Story = StoryObj<typeof Tab>

export const Primary: Story = {
  args: {
    content: "Transactions",
    active: false
  },
  argTypes: { setActive: { action: "clicked" } }
}
