import { FC } from "react";
import { NewDescriptionMappingsProvider } from "./context/useNewDescriptionMappings";
import { ModalProvider } from "./context/ModalContext";
import { QueryClient, QueryClientProvider } from "react-query";

export interface ProviderProps {
  children: React.ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
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
