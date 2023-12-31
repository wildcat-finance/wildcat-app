import { Navigate, RouteObject } from "react-router-dom"

import * as React from "react"
import { LENDERS_PATH } from "./constants"
import LendersServiceAgreement from "../LendersServiceAgreement"
import ActiveVaults from "../LenderMarketsList"
import { LenderMarketDetails } from "../LenderMarketDetails"

export const LENDERS_ROUTES: RouteObject[] = [
  {
    path: LENDERS_PATH.IndexPage,
    element: <ActiveVaults />,
    index: true,
  },
  {
    path: LENDERS_PATH.ServiceAgreement,
    element: <LendersServiceAgreement />,
  },
  {
    path: LENDERS_PATH.MarketDetails,
    element: <LenderMarketDetails />,
  },
]
