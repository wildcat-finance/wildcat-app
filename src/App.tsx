import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ApolloProvider } from "@apollo/react-hooks"

import { WagmiProvider } from "./modules/wagmi/components"
import Layout from "./pages/Layout"
import { ActiveVaults } from "./pages"
import LendersServiceAgreement from "./pages/lenders/LendersServiceAgreement"
import "./styles/index.css"
import BorrowerSection from "./pages/borrower"
import { BASE_PATHS } from "./routes/constants"
import { client } from "./client/client"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: `${BASE_PATHS.Borrower}/*`,
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
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </WagmiProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
