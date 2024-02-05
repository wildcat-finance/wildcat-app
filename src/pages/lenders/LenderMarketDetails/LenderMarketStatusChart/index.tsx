import {
  MarketBarchart,
  LegendItem,
} from "../../../../components/ui-components"
import { LenderMarketStatusChartProps } from "./interface"
import { formatTokenWithCommas } from "../../../../utils/formatters"
import { MARKET_BAR_ORDER } from "./constants"
import { useGenerateBarData } from "./hooks/useGenerateBarData"
import "./styles.css"

export const LenderMarketStatusChart = ({
  marketAccount,
}: LenderMarketStatusChartProps) => {
  const barRawData = useGenerateBarData(marketAccount)

  const barOrders = MARKET_BAR_ORDER.healthyBarchartOrder
  const legendItemsOrder = MARKET_BAR_ORDER.healthyLegendOrder

  const bars = barOrders
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])

  const legendItems = legendItemsOrder
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])

  const marketCapacity = marketAccount.market.maxTotalSupply

  return (
    <div className="mb-14">
      <div className="flex mb-6 justify-between text-base font-bold">
        <div>Market Capacity:</div>

        <div>{formatTokenWithCommas(marketCapacity, true)}</div>
      </div>

      {marketCapacity.gt(0) && (
        <MarketBarchart data={bars.filter((b) => !b.hide)} />
      )}

      <div className="barchart__legend">
        {legendItems.map((chartItem) => (
          <LegendItem
            key={chartItem.label}
            chartItem={chartItem}
            type="default"
          />
        ))}
      </div>
    </div>
  )
}
