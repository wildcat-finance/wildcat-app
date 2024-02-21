import { LegendItem, BarItem } from "../../../../components/ui-components"
import { LenderTotalDebtsChartProps } from "./interface"
import { formatTokenWithCommas } from "../../../../utils/formatters"
import { MARKET_BAR_ORDER } from "./constants"
import { useGenerateBarData } from "./hooks/useGenerateBarData"
import "./styles.css"
import { useGetWithdrawals } from "../../../borrower/BorrowerMarketDetails/BorrowerWithdrawalRequests/hooks/useGetWithdrawals"

export const LenderTotalDebtsChart = ({
  marketAccount,
}: LenderTotalDebtsChartProps) => {
  const { data } = useGetWithdrawals(marketAccount.market)
  const barRawData = useGenerateBarData({
    market: marketAccount.market,
    lenderWithdrawals: data,
  })

  const barOrders = MARKET_BAR_ORDER.healthyBarchartOrder
  const legendItemsOrder = MARKET_BAR_ORDER.healthyLegendOrder

  const bars = barOrders
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])
    .filter((chartItem) => !chartItem.hide && !chartItem.value.raw.isZero())

  const legendItems = legendItemsOrder
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])

  const marketCapacity = marketAccount.market.maxTotalSupply

  return (
    <div className="mb-14">
      <div className="flex mb-6 justify-between text-base font-bold">
        <div>Market Assets:</div>

        <div>{formatTokenWithCommas(marketCapacity, { withSymbol: true })}</div>
      </div>

      {marketCapacity.gt(0) && (
        <div className="barchart__container">
          {bars.map((chartItem) => (
            <BarItem
              key={chartItem.id}
              chartItem={chartItem}
              isOnlyBarItem={bars.length === 1}
            />
          ))}
        </div>
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
