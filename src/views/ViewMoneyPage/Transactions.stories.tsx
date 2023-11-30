import { Meta, StoryObj } from "@storybook/react";
import Transactions from "./Transactions";

const meta: Meta<typeof Transactions> = {
  component: Transactions
}

// eslint-disable-next-line react-refresh/only-export-components
export default meta

type Story = StoryObj<typeof Transactions>

export const Primary: Story = {
  render: () => <Transactions />
}