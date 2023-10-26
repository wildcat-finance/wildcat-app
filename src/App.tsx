import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { WagmiProvider } from "./modules/wagmi/components"
import Layout from "./pages/Layout"
import { ActiveVaults } from "./pages"
import LendersServiceAgreement from "./pages/lenders/LendersServiceAgreement"
import "./styles/index.css"
import BorrowerSection from "./pages/borrower"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/borrower/*",
        element: <BorrowerSection />,
      },
      {
        path: "/lender",
        children: [
          {
            path: "*",
            element: <LendersServiceAgreement />,
          },
          {
            path: "agreement",
            element: <LendersServiceAgreement />,
          },
          {
            path: "active-vaults",
            element: <ActiveVaults />,
          },
        ],
      },
    ],
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <RouterProvider router={router} />
      </WagmiProvider>
    </QueryClientProvider>
  )
}
