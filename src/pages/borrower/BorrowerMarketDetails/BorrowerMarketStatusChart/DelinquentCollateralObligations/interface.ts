import { Market } from "@wildcatfi/wildcat-sdk"
import { MarketBarChartItem } from "../../../../../components/ui-components/Barchart/MarketBarchart/interface"

export type DelinquentCollateralObligationsProps = {
  market: Market
  legendItem: MarketBarChartItem
  children?: React.ReactNode
}
