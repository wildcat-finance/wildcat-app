import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './styles/index.css';

import { WagmiProvider } from "./modules/wagmi/components";
import { Header } from './components/Header'

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <Header />
          <div className="p-10 bg-sand">
          </div>
        </WagmiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
