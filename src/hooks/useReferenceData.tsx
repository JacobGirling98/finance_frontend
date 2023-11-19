import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { Description } from "../types/NewMoney"
import { Entity } from "../types/Api"
import { useNewDescriptionMappingsContext } from "./useNewDescriptionMappings"
import { useContext } from "react"
import { ReferenceDataContext } from "../context/ReferenceDataContext"

const getReferenceData = async (dataType: string) => {
  const response = await axios.get(`/api/reference/${dataType}`)
  return response.data
}

const useReferenceData = () => {
  const { data: categoriesData, isLoading: categoriesIsLoading } = useQuery<
    Entity<string>[]
  >("getCategories", () => getReferenceData("categories"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const { data: accountsData, isLoading: accountsIsLoading } = useQuery<
    Entity<string>[]
  >("getAccounts", () => getReferenceData("accounts"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const { data: sourcesData, isLoading: sourcesIsLoading } = useQuery<
    Entity<string>[]
  >("getSources", () => getReferenceData("sources"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const { data: payeesData, isLoading: payeesIsLoading } = useQuery<
    Entity<string>[]
  >("getPayees", () => getReferenceData("payees"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const { data: descriptionsEntityData, isLoading: descriptionsIsLoading } =
    useQuery<Entity<Description>[]>(
      "getDescriptions",
      () => getReferenceData("descriptions"),
      {
        staleTime: 60000,
        refetchOnMount: false
      }
    )

  const { mutate: postDescriptions } = useMutation<void, void, Description[]>(
    "postDescriptions",
    async (newDescriptions: Description[]) => {
      const response = await axios.post(
        `/api/reference/descriptions/multiple`,
        newDescriptions
      )
      return response.data
    },
    {
      onSuccess: () => {
        clearDescriptions()
      }
    }
  )

  const { mutate: postAccounts } = useMutation<void, void, string[]>(
    "postAccounts",
    async (newAccounts: string[]) => {
      const response = await axios.post(`/api/reference/accounts`, newAccounts)
      return response.data
    },
    {
      onSuccess: () => {
        clearAccounts()
      }
    }
  )

  const { mutate: postCategories } = useMutation<void, void, string[]>(
    "postCategories",
    async (newCategories: string[]) => {
      const response = await axios.post(
        `/api/reference/categories`,
        newCategories
      )
      return response.data
    },
    {
      onSuccess: () => {
        clearCategories()
      }
    }
  )

  const { mutate: postPayees } = useMutation<void, void, string[]>(
    "postPayees",
    async (newPayees: string[]) => {
      const response = await axios.post(`/api/reference/payees`, newPayees)
      return response.data
    },
    {
      onSuccess: () => {
        clearPayees()
      }
    }
  )

  const { mutate: postSources } = useMutation<void, void, string[]>(
    "postSources",
    async (newSources: string[]) => {
      const response = await axios.post(`/api/reference/sources`, newSources)
      return response.data
    },
    {
      onSuccess: () => {
        clearSources()
      }
    }
  )

  const {
    addDescription,
    addDescriptionMapping,
    clearDescriptions,
    descriptions
  } = useNewDescriptionMappingsContext()

  const {
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
  } = useContext(ReferenceDataContext)

  const isLoading =
    categoriesIsLoading &&
    accountsIsLoading &&
    sourcesIsLoading &&
    payeesIsLoading &&
    descriptionsIsLoading

  const descriptionsData = descriptionsEntityData?.map((e) => e.domain)

  const combinedDescriptions = descriptionsData?.concat(descriptions) ?? []
  const combinedAccounts =
    accountsData?.map((e) => e.domain)?.concat(accounts) ?? []
  const combinedCategories =
    categoriesData?.map((e) => e.domain)?.concat(categories) ?? []
  const combinedPayees = payeesData?.map((e) => e.domain)?.concat(payees) ?? []
  const combinedSources =
    sourcesData?.map((e) => e.domain)?.concat(sources) ?? []

  const uniqueDescriptions = () =>
    Array.from(
      new Set(
        combinedDescriptions.map((description) => description.shortDescription)
      ).values()
    )

  const postNewDescriptions = (descriptionsFromTransactions: string[]) => {
    const newDescriptions = descriptions.filter((desc) =>
      descriptionsFromTransactions.includes(desc.shortDescription)
    )
    if (newDescriptions.length > 0) postDescriptions(newDescriptions)
  }

  const postNewAccounts = (accountsFromTransactions: string[]) => {
    const newAccounts = accounts.filter((acc) =>
      accountsFromTransactions.includes(acc)
    )
    if (newAccounts.length > 0) postAccounts(newAccounts)
  }

  const postNewCategories = (categoriesFromTransactions: string[]) => {
    const newCategories = categories.filter((cat) =>
      categoriesFromTransactions.includes(cat)
    )
    if (newCategories.length > 0) {
      postCategories(newCategories)
    }
  }

  const postNewPayees = (payeesFromTransactions: string[]) => {
    const newPayees = payees.filter((payees) =>
      payeesFromTransactions.includes(payees)
    )
    if (newPayees.length > 0) postPayees(newPayees)
  }

  const postNewSources = (sourcesFromTransactions: string[]) => {
    const newSources = sources.filter((srcs) =>
      sourcesFromTransactions.includes(srcs)
    )
    if (newSources.length > 0) postSources(newSources)
  }

  const shortDescriptionFrom = (fullDescription: string): string =>
    combinedDescriptions.find(
      (desc) => desc.fullDescription === fullDescription
    )?.shortDescription ?? ""

  return {
    isLoading,
    categories: categoriesData ?? [],
    accounts: accountsData ?? [],
    sources: sourcesData ?? [],
    payees: payeesData ?? [],
    descriptions: combinedDescriptions,
    uniqueDescriptions: uniqueDescriptions(),
    addNewDescription: addDescription,
    addNewDescriptionMapping: addDescriptionMapping,
    postNewDescriptions,
    shortDescriptionFrom,
    postNewAccounts,
    postNewCategories,
    postNewPayees,
    postNewSources,
    addAccount,
    addCategory,
    addPayee,
    addSource
  }
}

export default useReferenceData
