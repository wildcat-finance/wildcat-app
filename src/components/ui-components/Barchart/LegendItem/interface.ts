import { MarketBarChartItem } from "../MarketBarchart/interface"

export type LegendItemProps = {
  chartItem: MarketBarChartItem
  type?: "default" | "expandable" | "extended"
  children?: React.ReactNode
}
