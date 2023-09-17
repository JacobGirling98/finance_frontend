import { TransactionType } from "../types/NewMoney"

export const toTransactionType = (type: string) => {
  switch (type.toUpperCase()) {
    case "DEBIT": return TransactionType.DEBIT
    case "CREDIT": return TransactionType.CREDIT
    case "BANK_TRANSFER": return TransactionType.BANK_TRANSFER
    case "PERSONAL_TRANSFER": return TransactionType.PERSONAL_TRANSFER
    case "INCOME": return TransactionType.INCOME
    default: throw Error("Invalid transactiont type string")
  }
}
