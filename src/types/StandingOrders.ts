import { TransactionType } from "./NewMoney";

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
