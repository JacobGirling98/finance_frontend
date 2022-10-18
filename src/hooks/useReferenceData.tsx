import axios from "axios";
import {useQuery} from "react-query";
import {Description} from "../types/NewMoney";
import {baseUrl} from "../utils/constants";

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

  const uniqueDescriptions = () => Array.from(new Set(descriptionsData?.map(description => description.shortDescription) ?? null).values())

  const isLoading = categoriesIsLoading!! && accountsIsLoading!! && sourcesIsLoading!! && payeesIsLoading!! && descriptionsIsLoading!!

  return {
    isLoading,
    categories: categories ?? [],
    accounts: accounts ?? [],
    sources: sources ?? [],
    payees: payees ?? [],
    descriptions: descriptionsData ?? [],
    uniqueDescriptions: uniqueDescriptions()
  }
}

export default useReferenceData