import { useGetWithdrawals } from "../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"
import { useGenerateBarData } from "./hooks/useGenerateBarData"
import { formatTokenWithCommas } from "../../../../utils/formatters"

import { BorrowerMarketStatusChartProps } from "./interface"

import {
  MarketBarchart,
  LegendItem,
} from "../../../../components/ui-components"
import { DelinquentCollateralObligations } from "./DelinquentCollateralObligations"
import "./styles.css"

import { MARKET_BAR_DATA, MARKET_BAR_ORDER } from "./constants"

export const BorrowerMarketStatusChart = ({
  market,
}: BorrowerMarketStatusChartProps) => {
  const { data: withdrawals } = useGetWithdrawals(market)

  const barRawData = useGenerateBarData(market, withdrawals)

  const barOrders = market.isDelinquent
    ? MARKET_BAR_ORDER.delinquentBarsOrder
    : MARKET_BAR_ORDER.healthyBarchartOrder

  const bars = barOrders
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])

  const delinquentLegend = MARKET_BAR_ORDER.delinquentLegendOrder
    .filter((barId) => barRawData[barId] !== undefined)
    .map((barId) => barRawData[barId])

  return (
    <div className="mb-14">
      <div className="flex mb-6 justify-between text-base font-bold">
        <div>Total Debt:</div>
        {market.totalBorrowed && (
          <div>{formatTokenWithCommas(market.totalBorrowed, true)}</div>
        )}
      </div>
      <MarketBarchart data={bars} />

      <div className="barchart__legend">
        {!market.isDelinquent &&
          bars.map((chartItem) => (
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
                  <div className="barchart__legend-obligations-value">
                    <div>{formatTokenWithCommas(market.coverageLiquidity)}</div>
                    <div>Min Reserves</div>
                  </div>
                  <div className="barchart__legend-obligations-value">
                    <div>
                      {formatTokenWithCommas(
                        withdrawals.activeWithdrawalsTotalOwed,
                      )}
                    </div>
                    <div>Ongoing WDs</div>
                  </div>
                  <div className="barchart__legend-obligations-value">
                    <div>
                      {formatTokenWithCommas(
                        withdrawals.expiredWithdrawalsTotalOwed,
                      )}
                    </div>
                    <div>Claimable WDs</div>
                  </div>
                  <div className="barchart__legend-obligations-value">
                    <div>
                      {formatTokenWithCommas(
                        withdrawals.expiredWithdrawalsTotalOwed,
                      )}
                    </div>
                    <div>Outstanding WDs</div>
                  </div>
                  <div className="barchart__legend-divider" />
                </div>
              )}
            </LegendItem>
          ))}
        {market.isDelinquent &&
          delinquentLegend.map((legendItem) => (
            <LegendItem
              chartItem={legendItem}
              type={
                legendItem.id === MARKET_BAR_DATA.collateralObligations.id
                  ? "extended"
                  : "default"
              }
            >
              <DelinquentCollateralObligations
                market={market}
                legendItem={legendItem}
              >
                <div className="barchart__legend-obligations-values-container">
                  <div className="barchart__legend-obligations-value">
                    <div>{formatTokenWithCommas(market.coverageLiquidity)}</div>
                    <div>Min Reserves</div>
                  </div>
                  <div className="barchart__legend-obligations-value">
                    <div>
                      {formatTokenWithCommas(
                        withdrawals.activeWithdrawalsTotalOwed,
                      )}
                    </div>
                    <div>Ongoing WDs</div>
                  </div>
                  <div className="barchart__legend-obligations-value">
                    <div>
                      {formatTokenWithCommas(
                        withdrawals.expiredWithdrawalsTotalOwed,
                      )}
                    </div>
                    <div>Claimable WDs</div>
                  </div>
                  <div className="barchart__legend-obligations-value">
                    <div>
                      {formatTokenWithCommas(
                        withdrawals.expiredWithdrawalsTotalOwed,
                      )}
                    </div>
                    <div>Outstanding WDs</div>
                  </div>
                </div>
              </DelinquentCollateralObligations>
            </LegendItem>
          ))}
      </div>
    </div>
  )
}
