import { Market, MarketAccount } from "@wildcatfi/wildcat-sdk"

export type BorrowAssetProps = {
  borrowableAssets: Market["borrowableAssets"]
  marketAccount: MarketAccount
}
