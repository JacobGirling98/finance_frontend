import {Description} from "../types/NewMoney";
import React, {FC, useContext, useEffect, useState} from "react";

interface INewDescriptionMappingsContext {
  descriptions: Description[];
  addDescriptionMapping: (description: Description) => void;
  addDescription: (description: string) => void;
  clearDescriptions: () => void;
}

const defaultState: INewDescriptionMappingsContext = {
  descriptions: [],
  addDescriptionMapping: description => {
  },
  addDescription: description => {
  },
  clearDescriptions: () => {
  }
}

const NewDescriptionMappingsContext = React.createContext<INewDescriptionMappingsContext>(defaultState)

interface ProviderProps {
  children: React.ReactNode
}

export const NewDescriptionMappingsProvider: FC<ProviderProps> = ({children}) => {
  const [descriptions, setDescriptions] = useState<Description[]>([])

  useEffect(() => {
    console.log(descriptions)
  }, [descriptions])

  const addDescriptionMapping = (description: Description) => {
    setDescriptions(desc => [...desc, description])
  }

  const addDescription = (description: string) => {
    setDescriptions(desc => [...desc, {shortDescription: description, fullDescription: description}])
  }

  const clearDescriptions = () => {
    setDescriptions([])
  }

  return (
    <NewDescriptionMappingsContext.Provider
      value={{descriptions, addDescriptionMapping, addDescription, clearDescriptions}}
    >
      {children}
    </NewDescriptionMappingsContext.Provider>
  )
}

export const useNewDescriptionMappingsContext = () => useContext(NewDescriptionMappingsContext)