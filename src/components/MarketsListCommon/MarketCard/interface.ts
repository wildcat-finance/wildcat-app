import { Market, MarketAccount } from "@wildcatfi/wildcat-sdk"

export type MarketCardProps = {
  className?: string
  showBorrower?: boolean
  basePath: string
  showRole?: boolean
} & (
  | {
      market: Market
      account?: undefined
      showBalance?: undefined
      showAvailableToLend?: undefined
      variant: "borrower"
    }
  | {
      market?: undefined
      account: MarketAccount
      showBalance?: boolean
      showAvailableToLend?: boolean
      variant: "lender"
    }
)
