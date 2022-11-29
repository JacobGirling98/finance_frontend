import {Description} from "../types/NewMoney";
import React, {FC, useContext, useState} from "react";
import {ProviderProps} from "../Providers";

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

export const NewDescriptionMappingsProvider: FC<ProviderProps> = ({children}) => {
  const [descriptions, setDescriptions] = useState<Description[]>([])

  const addDescriptionMapping = (description: Description) => {
    if (description.fullDescription !== "" && description.shortDescription !== "")
      setDescriptions(desc => [...desc, description])
  }

  const addDescription = (description: string) => {
    if (description !== "")
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