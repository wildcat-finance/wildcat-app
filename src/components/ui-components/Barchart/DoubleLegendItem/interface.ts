import { MarketBarChartItem } from "../MarketBarchart/interface"

export type DoubleLegendItemProps = {
  firstChartItem: MarketBarChartItem
  secondChartItem: MarketBarChartItem
  total?: string
  children?: React.ReactNode
}
