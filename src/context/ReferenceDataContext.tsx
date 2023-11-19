/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react"
import { ChildrenProps } from "../types/ChildrenProps"

/* eslint-disable @typescript-eslint/no-empty-function */
interface IReferenceDataContext {
  payees: string[]
  addPayee: (_: string) => void
  clearPayees: () => void
  accounts: string[]
  addAccount: (_: string) => void
  clearAccounts: () => void
  sources: string[]
  addSource: (_: string) => void
  clearSources: () => void
  categories: string[]
  addCategory: (_: string) => void
  clearCategories: () => void
}

const defaultState: IReferenceDataContext = {
  payees: [],
  addPayee: (_data) => {},
  clearPayees: () => {},
  accounts: [],
  addAccount: (_data) => {},
  clearAccounts: () => {},
  sources: [],
  addSource: (_data) => {},
  clearSources: () => {},
  categories: [],
  addCategory: (_data) => {},
  clearCategories: () => {}
}

export const ReferenceDataContext =
  React.createContext<IReferenceDataContext>(defaultState)

export const ReferenceDataProvider = ({ children }: ChildrenProps) => {
  const [payees, setPayees] = useState<string[]>([])
  const [accounts, setAccounts] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])

  const addPayee = (data: string) => {
    setPayees((d) => [...d, data])
  }

  const clearPayees = () => {
    setPayees([])
  }

  const addAccount = (data: string) => {
    setAccounts((d) => [...d, data])
  }

  const clearAccounts = () => {
    setAccounts([])
  }

  const addSource = (data: string) => {
    setSources((d) => [...d, data])
  }

  const clearSources = () => {
    setSources([])
  }

  const addCategory = (data: string) => {
    setCategories((d) => [...d, data])
  }

  const clearCategories = () => {
    setCategories([])
  }

  useEffect(() => {
    console.log(categories)
  }, [categories])

  return (
    <ReferenceDataContext.Provider
      value = {{
        accounts,
        addAccount,
        clearAccounts,
        categories,
        addCategory,
        clearCategories,
        payees,
        addPayee,
        clearPayees,
        sources,
        addSource,
        clearSources
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  )
}
