import { RouteObject } from "react-router-dom"

import HomePage from "../HomePage"
import AddNewVault from "../AddNewVault"
import ServiceAgreement from "../ServiceAgreement"
import MyVaults from "../MyVaults"
import VaultDetails from "../VaultDetails"

export const BORROWER_PATHS = {
  HomePage: "/",
  AddNewVault: "/add-new-vault",
  Agreement: "/agreement",
  MyVaults: "/my-vaults",
  VaultDetails: "/vault-details",
}

export const BORROWER_ROUTES: RouteObject[] = [
  {
    path: BORROWER_PATHS.HomePage,
    element: <HomePage />,
    index: true,
  },
  {
    path: BORROWER_PATHS.AddNewVault,
    element: <AddNewVault />,
  },
  {
    path: BORROWER_PATHS.Agreement,
    element: <ServiceAgreement />,
  },
  {
    path: BORROWER_PATHS.MyVaults,
    element: <MyVaults />,
  },
  {
    path: BORROWER_PATHS.VaultDetails,
    element: <VaultDetails />,
  },
]
