import { BankTransfer, CreditDebit, Income, PersonalTransfer } from "./NewMoney"

export interface StandingOrder {
  date: string
  frequencyQuantity: number
  frequency: "MONTHLY" | "WEEKLY"
  outgoing: boolean
  value: number
  type: string
  outbound?: string
  inbound?: string
  destination?: string
  source?: string
  description: string
  category: string
  quantity: number
  recipient?: string
}

export interface Frequency {
  frequencyQuantity: number
  frequency: "Months" | "Weeks"
}

export type CreditDebitStandingOrder = CreditDebit & Frequency

export type BankTransferStandingOrder = BankTransfer & Frequency

export type PersonalTransferStandingOrder = PersonalTransfer & Frequency

export type IncomeStandingOrder = Income & Frequency

export type AddStandingOrder =
  | CreditDebitStandingOrder
  | BankTransferStandingOrder
  | PersonalTransferStandingOrder
  | IncomeStandingOrder
