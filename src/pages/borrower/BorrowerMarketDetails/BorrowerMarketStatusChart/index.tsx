import { LegendItem, BarItem } from "../../../../components/ui-components"

import { BorrowerMarketStatusChartProps } from "./interface"
import { formatTokenWithCommas } from "../../../../utils/formatters"
import { useGetWithdrawals } from "../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"
import { MARKET_BAR_DATA, MARKET_BAR_ORDER } from "./constants"
import { useGenerateBarData } from "./hooks/useGenerateBarData"
import { CollateralObligationsData } from "./CollateralObligations/CollateralObligationsData"
import { DelinquentCollateralObligations } from "./CollateralObligations/DelinquentCollateralObligations"
import "./styles.css"
import { MarketBarChartItem } from "../../../../components/ui-components/Barchart/BarItem/interface"

export const BorrowerMarketStatusChart = ({
  market,
}: BorrowerMarketStatusChartProps) => {
  const { data: withdrawals } = useGetWithdrawals(market)
  const barRawData = useGenerateBarData(market)

  const barOrders = market.isDelinquent
    ? MARKET_BAR_ORDER.delinquentBarsOrder
    : MARKET_BAR_ORDER.healthyBarchartOrder
  const legendItemsOrder = market.isDelinquent
    ? MARKET_BAR_ORDER.delinquentLegendOrder
    : MARKET_BAR_ORDER.healthyLegendOrder

  const bars = barOrders
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])
    .filter((chartItem) => !chartItem.hide && chartItem.value !== "0")

  const legendItems = legendItemsOrder
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])

  const getLegendItemType = (
    chartItem: MarketBarChartItem & { hide?: boolean | undefined },
  ) => {
    if (
      chartItem.id === MARKET_BAR_DATA.collateralObligations.id &&
      !market.isDelinquent
    )
      return "expandable"
    if (
      chartItem.id === MARKET_BAR_DATA.collateralObligations.id &&
      market.isDelinquent
    )
      return "extended"
    return "default"
  }

  return (
    <div className="mb-14">
      <div className="flex mb-6 justify-between text-base font-bold">
        <div>Total Debt:</div>
        {market.totalBorrowed && (
          <div>{formatTokenWithCommas(market.totalDebts, true)}</div>
        )}
      </div>

      {market.totalDebts.gt(0) && (
        <div className="barchart__container">
          {bars.map((chartItem) => (
            <BarItem key={chartItem.id} chartItem={chartItem} />
          ))}
        </div>
      )}

      <div className="barchart__legend">
        {legendItems.map((chartItem) => (
          <LegendItem
            key={chartItem.label}
            chartItem={chartItem}
            type={getLegendItemType(chartItem)}
          >
            {chartItem.id === MARKET_BAR_DATA.collateralObligations.id && (
              <>
                {!market.isDelinquent && (
                  <div className="barchart__legend-obligations-values-container">
                    <CollateralObligationsData
                      market={market}
                      withdrawals={withdrawals}
                    />
                  </div>
                )}

                {market.isDelinquent && (
                  <div className="barchart__legend-obligations-values-container">
                    <DelinquentCollateralObligations
                      market={market}
                      legendItem={chartItem}
                      withdrawals={withdrawals}
                    />
                  </div>
                )}
              </>
            )}
          </LegendItem>
        ))}
      </div>
    </div>
  )
}
