import { BankTransfer, CreditDebit, Income, PersonalTransfer, TransactionType } from "./NewMoney";

export interface StandingOrder {
  nextDate: string;
  frequency: "monthly" | "weekly";
  outgoing: boolean;
  value: number;
  transactionType: TransactionType;
  outboundAccount?: string;
  inboundAccount?: string;
  destination?: string;
  source?: string;
  description: string;
  category: string;
  quantity: number;
  id: string;
}

export interface Frequency {
  frequencyQuantity: number
  frequencyUnit: "Monthly" | "Weekly"
}


export type CreditDebitStandingOrder = CreditDebit & Frequency

export type BankTransferStandingOrder = BankTransfer & Frequency

export type PersonalTransferStandingOrder = PersonalTransfer & Frequency

export type IncomeStandingOrder = Income & Frequency

export type AddStandingOrder = CreditDebitStandingOrder | BankTransferStandingOrder | PersonalTransferStandingOrder | IncomeStandingOrder