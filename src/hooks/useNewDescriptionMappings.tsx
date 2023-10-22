import { useContext } from "react"
import { NewDescriptionMappingsContext } from "../context/NewDescriptionMappings"

export const useNewDescriptionMappingsContext = () =>
  useContext(NewDescriptionMappingsContext)
