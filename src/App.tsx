import * as React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter, RouterProvider, useNavigate,
} from "react-router-dom";

import { WagmiProvider } from "./modules/wagmi/components";
import { Header } from './components/Header'
import { AddNewVault } from "./pages";
import './styles/index.css';
import Layout from "./pages/Layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "borrower",
    element: <Layout />,
    children: [
      {
        path: "add-new-vault",
        element: <AddNewVault />,
      }
    ]
  }
]);

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider>
            {/*<Header />*/}
            <RouterProvider router={router} />
          </WagmiProvider>
        </QueryClientProvider>
    </ChakraProvider>
  );
};
