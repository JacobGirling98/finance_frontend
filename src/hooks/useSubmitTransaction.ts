import {useMutation} from "react-query";
import axios from "axios";
import {baseUrl} from "../utils/constants";
import {BankTransfer, CreditDebit, Income, PersonalTransfer, Transaction, TransactionType} from "../types/NewMoney";

const useSubmitTransaction = () => {

  const {mutate: mutateCredit} = useMutation("postCredit", async (data: CreditDebit[]) => {
    const response = await axios.post(`${baseUrl}/transaction/multiple/credit`, data)
    return response.data
  })

  const {mutate: mutateDebit} = useMutation("postDebit", async (data: CreditDebit[]) => {
    const response = await axios.post(`${baseUrl}/transaction/multiple/debit`, data)
    return response.data
  })

  const {mutate: mutateBankTransfer} = useMutation("postBankTransfer", async (data: BankTransfer[]) => {
    const response = await axios.post(`${baseUrl}/transaction/multiple/bank-transfer`, data)
    return response.data
  })

  const {mutate: mutatePersonalTransfer} = useMutation("postPersonalTransfer", async (data: PersonalTransfer[]) => {
    const response = await axios.post(`${baseUrl}/transaction/multiple/personal-transfer`, data)
    return response.data
  })

  const {mutate: mutateIncome} = useMutation("postIncome", async (data: Income[]) => {
    const response = await axios.post(`${baseUrl}/transaction/multiple/income`, data)
    return response.data
  })

  const mutate = async (transactions: Transaction[], type: TransactionType) => {
    switch (type) {
      case TransactionType.CREDIT:
        mutateCredit(transactions as CreditDebit[]);
        break;
      case TransactionType.DEBIT:
        mutateDebit(transactions as CreditDebit[]);
        break;
      case TransactionType.BANK_TRANSFER
    }
  }

  return ({
    mutateCredit
  })
}

export default useSubmitTransaction;