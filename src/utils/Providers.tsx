import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalProvider } from "../context/ModalContext";
import { NewDescriptionMappingsProvider } from "../context/NewDescriptionMappings";
import { ChildrenProps } from "../types/ChildrenProps";
import { ReferenceDataProvider } from "../context/ReferenceDataContext";



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
  );
};

export default Providers;
