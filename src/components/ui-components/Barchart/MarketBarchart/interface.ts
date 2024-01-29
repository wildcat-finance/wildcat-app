export type MarketBarChartItem = {
  label: string
  value: string
  asset: string
  width: string
  color: string
  textColor?: string
}

export type MarketBarChartProps = {
  data: MarketBarChartItem[]
}
