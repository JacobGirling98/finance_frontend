import axios from "axios";
import {useMutation, useQuery} from "react-query";
import {Description} from "../types/NewMoney";
import {baseUrl} from "../utils/constants";
import {useNewDescriptionMappingsContext} from "../context/useNewDescriptionMappings";

const getReferenceData = async (dataType: string) => {
  const response = await axios.get(`${baseUrl}/reference/${dataType}`)
  return response.data
}

const useReferenceData = () => {
  const {
    data: categories,
    isLoading: categoriesIsLoading
  } = useQuery<string[]>("getCategories", () => getReferenceData("categories"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const {
    data: accounts,
    isLoading: accountsIsLoading
  } = useQuery<string[]>("getAccounts", () => getReferenceData("accounts"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const {
    data: sources,
    isLoading: sourcesIsLoading
  } = useQuery<string[]>("getSources", () => getReferenceData("sources"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const {
    data: payees,
    isLoading: payeesIsLoading
  } = useQuery<string[]>("getPayees", () => getReferenceData("payees"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const {
    data: descriptionsData,
    isLoading: descriptionsIsLoading
  } = useQuery<Description[]>("getDescriptions", () => getReferenceData("descriptions"), {
    staleTime: 60000,
    refetchOnMount: false
  })

  const {
    mutate: post
  } = useMutation<void, void, Description[]>("postDescriptions", async (newDescriptions: Description[]) => {
    const response = await axios.post(`${baseUrl}/reference/descriptions/multiple`, newDescriptions)
    return response.data
  }, {
    onSuccess: () => {
      clearDescriptions()
    }
  })

  const {
    addDescription,
    clearDescriptions,
    descriptions
  } = useNewDescriptionMappingsContext()

  const isLoading = categoriesIsLoading!! && accountsIsLoading!! && sourcesIsLoading!! && payeesIsLoading!! && descriptionsIsLoading!!

  const combinedDescriptions = descriptionsData?.concat(descriptions) ?? []

  const uniqueDescriptions = () => Array.from(new Set(combinedDescriptions.map(description => description.shortDescription)).values())

  const postNewDescriptions = (descriptionsFromTransactions: string[]) => {
    const newDescriptions = descriptions.filter(desc => descriptionsFromTransactions.includes(desc.shortDescription))
    if (newDescriptions.length > 0)
      post(newDescriptions)
  }

  return {
    isLoading,
    categories: categories ?? [],
    accounts: accounts ?? [],
    sources: sources ?? [],
    payees: payees ?? [],
    descriptions: combinedDescriptions,
    uniqueDescriptions: uniqueDescriptions(),
    addNewDescription: addDescription,
    postNewDescriptions
  }
}

export default useReferenceData