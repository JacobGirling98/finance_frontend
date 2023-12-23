import { FC } from "react"
import { ModalProvider } from "../context/ModalContext"
import { NewDescriptionMappingsProvider } from "../context/NewDescriptionMappings"
import { ChildrenProps } from "../types/ChildrenProps"
import { ReferenceDataProvider } from "../context/ReferenceDataContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Providers: FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <NewDescriptionMappingsProvider>
          <ReferenceDataProvider>
            <ModalProvider>{children}</ModalProvider>
          </ReferenceDataProvider>
        </NewDescriptionMappingsProvider>
      </QueryClientProvider>
    </>
  )
}

export default Providers
