import { RouteObject } from "react-router-dom"

import * as React from "react"
import { LENDERS_PATH } from "./constants"
import LendersServiceAgreement from "../LendersServiceAgreement"
import ActiveVaults from "../ActiveVaults"
import { LenderMarketDetails } from "../LenderMarketDetails"

export const LENDERS_ROUTES: RouteObject[] = [
  {
    path: LENDERS_PATH.IndexPage,
    element: <LendersServiceAgreement />,
    index: true,
  },
  {
    path: LENDERS_PATH.Agreement,
    element: <LendersServiceAgreement />,
  },
  {
    path: LENDERS_PATH.ActiveVaults,
    element: <ActiveVaults />,
  },
  {
    path: LENDERS_PATH.MarketDetails,
    element: <LenderMarketDetails />,
  },
]
