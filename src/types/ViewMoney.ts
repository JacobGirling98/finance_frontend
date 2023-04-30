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
