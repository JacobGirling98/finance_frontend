import { BankTransfer, CreditDebit, Income, PersonalTransfer, TransactionType } from "./NewMoney";

export interface StandingOrder {
  nextDate: string;
  frequencyQuantity: number
  frequencyUnit: "MONTHLY" | "WEEKLY";
  outgoing: boolean;
  value: number;
  type: string;
  outboundAccount?: string;
  inboundAccount?: string;
  destination?: string;
  source?: string;
  description: string;
  category: string;
  quantity: number;
  recipient?: string
}

export interface Frequency {
  frequencyQuantity: number
  frequencyUnit: "Months" | "Weeks"
}


export type CreditDebitStandingOrder = CreditDebit & Frequency

export type BankTransferStandingOrder = BankTransfer & Frequency

export type PersonalTransferStandingOrder = PersonalTransfer & Frequency

export type IncomeStandingOrder = Income & Frequency

export type AddStandingOrder = CreditDebitStandingOrder | BankTransferStandingOrder | PersonalTransferStandingOrder | IncomeStandingOrder