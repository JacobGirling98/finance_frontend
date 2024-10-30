import React, { useEffect } from "react"
import { userIsInDarkMode } from "../utils/dark-mode.ts"

const useDarkModeObserver = () => {
  const [colourMode, setColourMode] = React.useState(
    userIsInDarkMode() ? "dark" : "light"
  )

  useEffect(() => {
    const handleThemeChange = () => {
      setColourMode(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      )
    }

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return colourMode
}

export default useDarkModeObserver
