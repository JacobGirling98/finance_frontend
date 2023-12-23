import { DateRange, Period } from "../../types/ViewMoney"

const shortenYear = (year: string): string => year.substring(2)

const monthToText = (monthAsNumber: string): string => {
  switch (monthAsNumber) {
    case "01":
      return "Jan"
    case "02":
      return "Feb"
    case "03":
      return "Mar"
    case "04":
      return "Apr"
    case "05":
      return "May"
    case "06":
      return "Jun"
    case "07":
      return "Jul"
    case "08":
      return "Aug"
    case "09":
      return "Sep"
    case "10":
      return "Oct"
    case "11":
      return "Nov"
    case "12":
      return "Dec"
    default:
      throw new Error("Not a month")
  }
}

const monthFrom = (date: string) => date.split("-")[1]

const yearFrom = (date: string) => date.split("-")[0]

export const formatFiscalMonth = (dateRange: DateRange): string =>
  `${monthToText(monthFrom(dateRange.startDate))} ${shortenYear(
    yearFrom(dateRange.startDate)
  )} - ${monthToText(monthFrom(dateRange.endDate))} ${shortenYear(
    yearFrom(dateRange.endDate)
  )}`

export const formatMonth = (dateRange: DateRange): string => {
  return `${monthToText(monthFrom(dateRange.startDate))} ${shortenYear(
    yearFrom(dateRange.startDate)
  )}`
}

export const formatFiscalYear = (dateRange: DateRange): string =>
  `${yearFrom(dateRange.startDate)} - ${yearFrom(dateRange.endDate)}`

export const formatYear = (dateRange: DateRange): string =>
  `${yearFrom(dateRange.startDate)}`

export const matchingDateRange = (
  dateRange: string,
  period: Period,
  ranges: DateRange[]
): DateRange => {
  const parser = parsingFn(period)
  const matching = ranges.find((r) => dateRange === parser(r))
  if (matching === undefined) {
    throw new Error("No matching date range")
  }
  return matching
}

export const parsingFn = (period: Period): ((_: DateRange) => string) => {
  switch (period) {
    case "Fiscal Month": {
      return formatFiscalMonth
    }
    case "Fiscal Year": {
      return formatFiscalYear
    }
    case "Month": {
      return formatMonth
    }
    case "Year": {
      return formatYear
    }
  }
}
