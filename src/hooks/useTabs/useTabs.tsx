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
          <div>
            <Tab
              content={element.tabTitle}
              active={index === activeIndex}
              setActive={() => changeTab(index)}
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
