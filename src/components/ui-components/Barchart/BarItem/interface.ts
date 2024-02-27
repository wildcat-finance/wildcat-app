import { TokenAmount } from "@wildcatfi/wildcat-sdk"

export type MarketBarChartItem = {
  id: string
  label: string
  value: TokenAmount
  asset: string
  width: string
  color: string
  textColor?: string
  className?: string
  legendDotClassName?: string
} & (
  | {
      overlayClassName: string
      overlayWidth: string
    }
  | {
      overlayClassName?: undefined
      overlayWidth?: undefined
    }
)

export type BarItemProps = {
  chartItem: MarketBarChartItem
  isOnlyBarItem?: boolean
}
