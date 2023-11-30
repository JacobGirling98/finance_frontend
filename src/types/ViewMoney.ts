export interface DateRange {
  start: string;
  end: string;
}

export const periods = [
  "Fiscal Month",
  "Month",
  "Year",
  "Fiscal Year",
] as const;

export type Period = (typeof periods)[number];

export interface Transaction {
  date: string;
  category: string;
  value: number;
  description: string;
  type: string;
  quantity: number;
  recipient?: string
  inbound?: string;
  outbound?: string;
  source?: string;
}
