import { RouteObject } from "react-router-dom"

import BorrowerWhitelisting from "../HomePage"
import AddNewVault from "../AddNewVault"
import ServiceAgreement from "../ServiceAgreement"
import BorrowerMarketsList from "../BorrowerMarketsList"
import BorrowerMarketDetails from "../BorrowerMarketDetails"

import { BORROWER_PATHS } from "./constants"
import PendingRegistration from "../PendingRegistration"

export const BORROWER_ROUTES: RouteObject[] = [
  {
    path: BORROWER_PATHS.IndexPage,
    element: <BorrowerMarketsList />,
    index: true,
  },
  {
    path: BORROWER_PATHS.Whitelisting,
    element: <BorrowerWhitelisting />,
  },
  {
    path: BORROWER_PATHS.ServiceAgreement,
    element: <ServiceAgreement />,
  },
  {
    path: BORROWER_PATHS.AddNewMarket,
    element: <AddNewVault />,
  },
  {
    path: BORROWER_PATHS.MarketDetails,
    element: <BorrowerMarketDetails />,
  },
  {
    path: BORROWER_PATHS.PendingRegistration,
    element: <PendingRegistration />,
  },
]
