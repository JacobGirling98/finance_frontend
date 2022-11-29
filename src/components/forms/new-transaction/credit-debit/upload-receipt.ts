import {CreditDebit, Description, ReceiptTransaction} from "../../../../types/NewMoney";

export const parseSainsburysTransaction = (transaction: string): ReceiptTransaction => {
  const stringContents = transaction.split(" ")
  return {
    quantity: parseInt(stringContents[0]),
    value: parseFloat(stringContents[stringContents.length - 1].replace(/£/g, "")),
    description: stringContents.slice(1, stringContents.length - 1).join(" ")
  }
}

export const formatTransactions = (transactions: string): string[] => {
  const lines = transactions.split("\n")
  const formattedLines = []
  for (let i = 0; i < lines.length; i++) {
    let transaction = lines[i]
    while (true) {
      const splitLine = lines[i].split(" ")
      if (splitLine[splitLine.length - 1].includes("£")) {
        break;
      }
      i++
      transaction += ` ${lines[i]}`
    }
    formattedLines.push(transaction)
  }
  return formattedLines
}

export const flagNewDescriptions = (existingDescriptions: Description[], transactions: ReceiptTransaction[]): ReceiptTransaction[] => {
  const fullDescriptions = existingDescriptions.map(desc => desc.fullDescription)
  return transactions.map(transaction => ({
    ...transaction,
    isNewDescription: !fullDescriptions.includes(transaction.description)
  }))
}

export const receiptTransactionToCreditDebit = (receiptTransaction: ReceiptTransaction, category: string, date: string): CreditDebit => {
  return {
    ...receiptTransaction,
    category,
    date
  }
}

