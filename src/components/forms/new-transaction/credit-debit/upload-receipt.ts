import { Entity } from "../../../../types/Api";
import {
  CreditDebit,
  Description,
  ReceiptTransaction,
} from "../../../../types/NewMoney";

export const parseSainsburysTransaction = (
  transaction: string
): ReceiptTransaction => {
  const stringContents = transaction.split(" ");
  return {
    quantity: parseInt(stringContents[0]),
    value: parseFloat(
      stringContents[stringContents.length - 1].replace(/£/g, "")
    ),
    description: stringContents.slice(1, stringContents.length - 1).join(" "),
  };
};

export const parseWaitroseTransaction = (
  transaction: string
): ReceiptTransaction => {
  const stringContents = transaction.split("\n");
  return {
    quantity: parseInt(
      stringContents[stringContents.indexOf("Qty:") + 1].split("Cost")[0]
    ),
    description: stringContents[stringContents.indexOf("Product Name") + 1],
    value: parseFloat(
      stringContents[
        stringContents.findIndex((element) => element.includes("Cost")) + 1
      ].replace(/£/g, "")
    ),
  };
};

export const formatSainsburysTransactions = (
  transactions: string
): string[] => {
  const lines = transactions.split("\n");
  const formattedLines = [];
  for (let i = 0; i < lines.length; i++) {
    let transaction = lines[i];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const splitLine = lines[i].split(" ");
      if (splitLine[splitLine.length - 1].includes("£")) {
        break;
      }
      i++;
      transaction += ` ${lines[i]}`;
    }
    formattedLines.push(transaction);
  }
  return formattedLines;
};

export const formatWaitroseTransactions = (
  transactions: string
): ReceiptTransaction[] => {
  const splitTransactions = transactions.split("Product Image\n");
  return splitTransactions
    .filter((transaction) => transaction.split("\n").length > 2)
    .map((transaction) => parseWaitroseTransaction(transaction));
};

export const flagNewDescriptions = (
  existingDescriptions: Entity<Description>[],
  transactions: ReceiptTransaction[]
): ReceiptTransaction[] => {
  const fullDescriptions = existingDescriptions.map(
    (desc) => desc.domain.fullDescription
  );
  return transactions.map((transaction) => ({
    ...transaction,
    isNewDescription: !fullDescriptions.includes(transaction.description),
  }));
};

export const receiptTransactionToCreditDebit = (
  receiptTransaction: ReceiptTransaction,
  category: string,
  date: string
): CreditDebit => {
  return {
    ...receiptTransaction,
    category,
    date,
  };
};
