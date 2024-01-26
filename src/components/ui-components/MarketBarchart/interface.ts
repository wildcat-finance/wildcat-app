export type MarketBarChartItem = {
  label: string
  value: string
  asset: string
  width: string
  color: string
}

export type MarketBarChartProps = {
  data: MarketBarChartItem[]
}
