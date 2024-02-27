import { MarketParameters } from "@wildcatfi/wildcat-sdk/dist/controller"

export type DeployNewMarketParams = Omit<
  MarketParameters,
  "maxTotalSupply" | "asset"
> & {
  maxTotalSupply: number
  assetData: MarketParameters["asset"]
}
