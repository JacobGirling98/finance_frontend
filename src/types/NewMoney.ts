export interface BaseTransaction {
  date: string;
  category: string;
  value: number;
  description: string;
}

export interface CreditDebit extends BaseTransaction {
  quantity: number;
}

export interface BankTransfer extends BaseTransaction {
  recipient: string;
  quantity: number;
}

export interface PersonalTransfer extends BaseTransaction {
  outbound: string;
  inbound: string;
}

export interface Income extends BaseTransaction {
  source: string;
}

export type Transaction = CreditDebit | BankTransfer | PersonalTransfer | Income;

export type ValidationErrors<T> = {
  [Property in keyof T]: string;
}

export type TransactionFields = keyof CreditDebit | keyof BankTransfer | keyof PersonalTransfer | keyof Income;

export enum TransactionType {
  CREDIT = "Credit",
  DEBIT = "Debit",
  BANK_TRANSFER = "Bank Transfer",
  PERSONAL_TRANSFER = "Personal Transfer",
  INCOME = "Income",
}

export interface Description {
  fullDescription: string;
  shortDescription: string;
}

export interface ReceiptTransaction {
  quantity: number;
  description: string;
  value: number;
  isNewDescription?: boolean
}

export interface TransactionConfirmation {
  transactionCount: number;
  value: number;
}