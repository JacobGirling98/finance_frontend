import { ReactNode, useState } from "react"
import Tab from "../../components/navbar/Tabs/Tab"

export interface TabElement {
  tabTitle: string
  body: ReactNode
}

const useTabs = (elements: TabElement[]) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const changeTab = (index: number) => {
    setActiveIndex(index)
  }

  const elementToRender = elements[activeIndex].body

  const tabs = (
    <>
      <div className="flex">
        {elements.map((element, index) => (
          <div className="w-32">
            <Tab
              content={element.tabTitle}
              active={index === activeIndex}
              onClick={() => changeTab(index)}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </>
  )

  return {
    tabs,
    body: elementToRender
  }
}

export default useTabs
