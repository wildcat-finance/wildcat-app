import {
  MarketBarchart,
  LegendItem,
} from "../../../../components/ui-components"
import { BorrowerMarketStatusChartProps } from "./interface"
import { formatTokenWithCommas } from "../../../../utils/formatters"
import { useGetWithdrawals } from "../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"
import { MARKET_BAR_DATA, MARKET_BAR_ORDER } from "./constants"
import "./styles.css"
import { useGenerateBarData } from "./hooks/useGenerateBarData"
import { CollateralObligationsData } from "./CollateralObligations/CollateralObligationsData"

export const BorrowerMarketStatusChart = ({
  market,
}: BorrowerMarketStatusChartProps) => {
  const { data: withdrawals } = useGetWithdrawals(market)

  const barRawData = useGenerateBarData(market)

  const barOrders = market.isDelinquent
    ? MARKET_BAR_ORDER.delinquentBarsOrder
    : MARKET_BAR_ORDER.healthyBarchartOrder

  const bars = barOrders
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])

  return (
    <div className="mb-14">
      <div className="flex mb-6 justify-between text-base font-bold">
        <div>Total Debt:</div>
        {market.totalBorrowed && (
          <div>{formatTokenWithCommas(market.totalDebts, true)}</div>
        )}
      </div>

      {market.totalDebts.gt(0) && (
        <MarketBarchart data={bars.filter((b) => !b.hide)} />
      )}

      <div className="barchart__legend">
        {bars.map((chartItem) => (
          <LegendItem
            key={chartItem.label}
            chartItem={chartItem}
            type={
              chartItem.id === MARKET_BAR_DATA.collateralObligations.id
                ? "expandable"
                : "default"
            }
          >
            {chartItem.id === MARKET_BAR_DATA.collateralObligations.id && (
              <div className="barchart__legend-obligations-values-container">
                <CollateralObligationsData
                  market={market}
                  withdrawals={withdrawals}
                />
              </div>
            )}
          </LegendItem>
        ))}
      </div>
    </div>
  )
}
