import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RenderOptions, RenderResult, render } from "@testing-library/react"
import React from "react"

export const renderWithQueryClient = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    options
  )
}
