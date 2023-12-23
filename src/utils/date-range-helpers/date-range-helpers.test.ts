import { DateRange, Period } from "../../types/ViewMoney"
import {
  formatFiscalMonth,
  formatFiscalYear,
  formatMonth,
  formatYear,
  matchingDateRange
} from "./date-range-helpers"

test("fiscal months", () => {
  test("regular month", () => {
    const dateRange: DateRange = {
      startDate: "2023-01-15",
      endDate: "2023-02-15"
    }
    expect(formatFiscalMonth(dateRange)).toBe("Jan 22 - Feb 22")
  })

  test("between years", () => {
    const dateRange: DateRange = {
      startDate: "2022-12-15",
      endDate: "2023-01-15"
    }
    expect(formatFiscalMonth(dateRange)).toBe("Dec 22 - Jan 23")
  })
})

test("months", () => {
  const dateRange: DateRange = {
    startDate: "2023-01-01",
    endDate: "2023-02-01"
  }
  expect(formatMonth(dateRange)).toBe("Jan 23")
})

test("fiscal years", () => {
  const dateRange: DateRange = {
    startDate: "2023-04-15",
    endDate: "2024-04-15"
  }
  expect(formatFiscalYear(dateRange)).toBe("2023 - 2024")
})

test("years", () => {
  const dateRange: DateRange = {
    startDate: "2023-01-01",
    endDate: "2024-01-01"
  }
  expect(formatYear(dateRange)).toBe("2023")
})

test("can format a date range dependent on period", () => {
  test("fiscal month", () => {
    const period: Period = "Fiscal Month"
    const ranges: DateRange[] = [
      { startDate: "2023-01-15", endDate: "2023-02-15" },
      { startDate: "2023-02-15", endDate: "2023-03-15" },
      { startDate: "2023-03-15", endDate: "2023-04-15" }
    ]

    expect(matchingDateRange("Feb 23 - Mar 23", period, ranges)).toBe({
      startDate: "2023-02-15",
      endDate: "2023-03-15"
    })
  })

  test("month", () => {
    const period: Period = "Month"
    const ranges: DateRange[] = [
      { startDate: "2023-01-01", endDate: "2023-02-01" },
      { startDate: "2023-02-01", endDate: "2023-03-01" },
      { startDate: "2023-03-01", endDate: "2023-04-01" }
    ]

    expect(matchingDateRange("Feb 23", period, ranges)).toBe({
      startDate: "2023-02-01",
      endDate: "2023-03-01"
    })
  })

  test("fiscal year", () => {
    const period: Period = "Fiscal Year"
    const ranges: DateRange[] = [
      { startDate: "2023-04-15", endDate: "2024-04-15" },
      { startDate: "2024-04-15", endDate: "2025-04-15" },
      { startDate: "2025-04-15", endDate: "2026-04-15" }
    ]

    expect(matchingDateRange("2024 - 2025", period, ranges)).toBe({
      startDate: "2024-04-15",
      endDate: "2025-04-15"
    })
  })

  test("year", () => {
    const period: Period = "Year"
    const ranges: DateRange[] = [
      { startDate: "2023-01-01", endDate: "2024-01-01" },
      { startDate: "2024-01-01", endDate: "2025-01-01" },
      { startDate: "2025-01-01", endDate: "2026-01-01" }
    ]

    expect(matchingDateRange("2024", period, ranges)).toBe({
      startDate: "2024-01-01",
      endDate: "2025-01-01"
    })
  })
})
