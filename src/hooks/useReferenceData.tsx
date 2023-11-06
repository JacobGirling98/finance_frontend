import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { Description } from "../types/NewMoney"
import { Entity } from "../types/Api"
import { useNewDescriptionMappingsContext } from "./useNewDescriptionMappings"

const getReferenceData = async (dataType: string) => {
  const response = await axios.get(`/api/reference/${dataType}`)
  return response.data
}

const useReferenceData = () => {
  const { data: categories, isLoading: categoriesIsLoading } = useQuery<
    Entity<string>[]
  >("getCategories", () => getReferenceData("categories"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const { data: accounts, isLoading: accountsIsLoading } = useQuery<
    Entity<string>[]
  >("getAccounts", () => getReferenceData("accounts"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const { data: sources, isLoading: sourcesIsLoading } = useQuery<
    Entity<string>[]
  >("getSources", () => getReferenceData("sources"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const { data: payees, isLoading: payeesIsLoading } = useQuery<
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

  const { mutate: post } = useMutation<void, void, Description[]>(
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

  const {
    addDescription,
    addDescriptionMapping,
    clearDescriptions,
    descriptions
  } = useNewDescriptionMappingsContext()

  const isLoading =
    categoriesIsLoading &&
    accountsIsLoading &&
    sourcesIsLoading &&
    payeesIsLoading &&
    descriptionsIsLoading

  const descriptionsData = descriptionsEntityData?.map((e) => e.domain)

  const combinedDescriptions = descriptionsData?.concat(descriptions) ?? []

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
    if (newDescriptions.length > 0) post(newDescriptions)
  }

  const shortDescriptionFrom = (fullDescription: string): string =>
    combinedDescriptions.find(
      (desc) => desc.fullDescription === fullDescription
    )?.shortDescription ?? ""

  return {
    isLoading,
    categories: categories ?? [],
    accounts: accounts ?? [],
    sources: sources ?? [],
    payees: payees ?? [],
    descriptions: combinedDescriptions,
    uniqueDescriptions: uniqueDescriptions(),
    addNewDescription: addDescription,
    addNewDescriptionMapping: addDescriptionMapping,
    postNewDescriptions,
    shortDescriptionFrom
  }
}

export default useReferenceData
