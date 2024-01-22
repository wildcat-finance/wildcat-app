import { Market, MarketAccount } from "@wildcatfi/wildcat-sdk"

export type MarketCardProps = {
  className?: string
  showBorrower?: boolean
  basePath: string
  // variant?: "lender" | "borrower"
  showRole?: boolean
} & (
  | {
      market: Market
      account?: undefined
      showBalance?: undefined
      variant: "borrower"
    }
  | {
      market?: undefined
      account: MarketAccount
      showBalance?: boolean
      variant: "lender"
    }
)
