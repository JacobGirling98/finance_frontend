import axios from "axios";
import {useQuery} from "react-query";

const getReferenceData = async (dataType: string) => {
  const response = await axios.get(`http://localhost:9000/reference/${dataType}`)
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

  const isLoading = categoriesIsLoading!! && accountsIsLoading!! && sourcesIsLoading!! && payeesIsLoading!!

  return {
    isLoading,
    categories: categories ?? [],
    accounts: accounts ?? [],
    sources: sources ?? [],
    payees: payees ?? []
  }
}

export default useReferenceData