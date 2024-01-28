import { StoryObj, Meta } from "@storybook/react"
import Filter from "./Filter"

const meta: Meta<typeof Filter> = {
  title: "Filter",
  component: Filter
}

// eslint-disable-next-line react-refresh/only-export-components
export default meta

type Story = StoryObj<typeof Filter>

export const Primary: Story = {}
