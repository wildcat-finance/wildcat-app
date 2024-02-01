import { MarketBarChartItem } from "../MarketBarchart/interface"

export type LegendItemProps = {
  type?: "default" | "expandable" | "extended"
  chartItem: Pick<
    MarketBarChartItem,
    "label" | "legendDotClassName" | "color" | "value" | "asset"
  >
  expandable?: boolean
  children?: React.ReactNode
}
