import { Market, MarketAccount } from "@wildcatfi/wildcat-sdk"

export type MarketCardProps = {
  className?: string
  showBorrower?: boolean
  basePath: string
  variant?: "lender" | "borrower"
} & (
  | {
      market: Market
      account?: undefined
      showBalance?: undefined
      showLenderRole?: undefined
    }
  | {
      market?: undefined
      account: MarketAccount
      showBalance?: boolean
      showLenderRole?: boolean
    }
)
