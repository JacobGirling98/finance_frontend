import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalProvider } from "../context/ModalContext";
import { NewDescriptionMappingsProvider } from "../context/NewDescriptionMappings";
import { ChildrenProps } from "../types/ChildrenProps";



const Providers: FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <NewDescriptionMappingsProvider>
          <ModalProvider>{children}</ModalProvider>
        </NewDescriptionMappingsProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
