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