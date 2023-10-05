import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";

import { WagmiProvider } from "./modules/wagmi/components";
import Layout from "./pages/Layout";
import { AddNewVault, ServiceAgreement, HomePage, MyVaults, VaultDetails } from "./pages";
import './styles/index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/borrower",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <HomePage />,
      },
      {
        path: "add-new-vault",
        element: <AddNewVault />,
      },
      {
        path: "agreement",
        element: <ServiceAgreement />,
      },
      {
        path: "my-vaults",
        element: <MyVaults />
      },
      {
        path: "vault-details",
        element: <VaultDetails />
      },
    ]
  }
]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <RouterProvider router={router} />
      </WagmiProvider>
    </QueryClientProvider>
  );
};
