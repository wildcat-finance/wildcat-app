import { RouteObject } from "react-router-dom"

import HomePage from "../HomePage"
import AddNewVault from "../AddNewVault"
import ServiceAgreement from "../ServiceAgreement"
import BorrowerMarketsList from "../BorrowerMarketsList"
import BorrowerMarketDetails from "../BorrowerMarketDetails"

import { BORROWER_PATHS } from "./constants"

export const BORROWER_ROUTES: RouteObject[] = [
  {
    path: BORROWER_PATHS.HomePage,
    element: <div />,
    index: true,
  },
  {
    path: BORROWER_PATHS.SignAgreement,
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
    path: BORROWER_PATHS.MarketsList,
    element: <BorrowerMarketsList />,
  },
  {
    path: BORROWER_PATHS.VaultDetails,
    element: <BorrowerMarketDetails />,
  },
]
