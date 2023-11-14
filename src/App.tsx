import * as React from "react"
import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { WagmiProvider } from "./modules/wagmi/components"
import Layout from "./pages/Layout"
import "./styles/index.css"
import BorrowerSection from "./pages/borrower"
import { BASE_PATHS } from "./routes/constants"
import LendersSection from "./pages/lenders"
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
        path: `${BASE_PATHS.Lender}/*`,
        element: <LendersSection />,
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
