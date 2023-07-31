/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Description } from "../types/NewMoney"
import { FC, useContext, useState } from "react"
import { ProviderProps } from "../Providers"
import React from "react"
import { Entity } from "../types/Api"

interface INewDescriptionMappingsContext {
  descriptions: Entity<Description>[]
  addDescriptionMapping: (description: Description) => void
  addDescription: (description: string) => void
  clearDescriptions: () => void
}

const defaultState: INewDescriptionMappingsContext = {
  descriptions: [],
  addDescriptionMapping: (_description) => {},
  addDescription: (_description) => {},
  clearDescriptions: () => {},
}

const NewDescriptionMappingsContext =
  React.createContext<INewDescriptionMappingsContext>(defaultState)

export const NewDescriptionMappingsProvider: FC<ProviderProps> = ({
  children,
}) => {
  const [descriptions, setDescriptions] = useState<Entity<Description>[]>([])

  const addDescriptionMapping = (description: Description) => {
    if (
      description.fullDescription !== "" &&
      description.shortDescription !== ""
    )
      setDescriptions((desc) => [...desc, { id: "", domain: description }])
  }

  const addDescription = (description: string) => {
    if (description !== "")
      setDescriptions((desc) => [
        ...desc,
        {
          id: "",
          domain: {
            shortDescription: description,
            fullDescription: description,
          },
        },
      ])
  }

  const clearDescriptions = () => {
    setDescriptions([])
  }

  return (
    <NewDescriptionMappingsContext.Provider
      value={{
        descriptions,
        addDescriptionMapping,
        addDescription,
        clearDescriptions,
      }}
    >
      {children}
    </NewDescriptionMappingsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNewDescriptionMappingsContext = () =>
  useContext(NewDescriptionMappingsContext)
