import { StoryObj, Meta } from "@storybook/react"
import useTabs, { TabElement } from "./useTabs"

const UseTabsDemo = () => {
  const tabElements: TabElement[] = [
    { tabTitle: "First Tab", body: <p>First Tab Body</p> },
    { tabTitle: "Second Tab", body: <p>Second Tab Body</p> },
    { tabTitle: "Third Tab", body: <p>Third Tab Body</p> }
  ]

  const { tabs, body } = useTabs(tabElements)

  return (
    <>
      <div>
        {tabs}
        {body}
      </div>
    </>
  )
}

const meta: Meta<typeof UseTabsDemo> = {
  title: "useTabs",
  component: UseTabsDemo
}

// eslint-disable-next-line react-refresh/only-export-components
export default meta

type Story = StoryObj<typeof UseTabsDemo>

export const Primary: Story = {}
