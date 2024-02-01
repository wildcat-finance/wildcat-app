import { Market, TokenAmount } from "@wildcatfi/wildcat-sdk"
import {
  MarketBarchart,
  LegendItem,
} from "../../../../components/ui-components"
import { MarketBarChartItem } from "../../../../components/ui-components/Barchart/MarketBarchart/interface"
import { BorrowerMarketStatusChartProps } from "./interface"
import { formatTokenWithCommas } from "../../../../utils/formatters"
import { useGetWithdrawals } from "../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"
import { MARKET_BAR_DATA } from "./constants"
import "./styles.css"

const getPercentageTokenAmount = (total: TokenAmount, amount: TokenAmount) =>
  (parseFloat(amount.toFixed(2)) * 100) / parseFloat(total.toFixed(2))

const getTokenAmountPercentageWidth = (
  total: TokenAmount,
  amount: TokenAmount,
) => `${getPercentageTokenAmount(total, amount)}%`

const generateBarData = (
  market: Market,
): {
  [key: string]: MarketBarChartItem & { hide?: boolean }
} => {
  const breakdown = market.getTotalDebtBreakdown()
  const barData: {
    [key: string]: MarketBarChartItem & { hide?: boolean }
  } = {}
  const asset = market.underlyingToken.symbol

  const { totalDebt } = breakdown

  const colorKey =
    breakdown.status === "healthy" ? "healthyBgColor" : "delinquentBgColor"

  const setBarData = (
    field: keyof typeof MARKET_BAR_DATA,
    value: TokenAmount,
  ) => {
    if (value.lte(0)) return
    const { id, label, [colorKey]: color } = MARKET_BAR_DATA[field]
    barData[id] = {
      id,
      label,
      value: formatTokenWithCommas(value),
      asset,
      width: getTokenAmountPercentageWidth(totalDebt, value),
      color,
    }
  }
  if (breakdown.status === "delinquent") {
    setBarData("collateralObligations", breakdown.collateralObligation)
    setBarData("borrowed", breakdown.borrowed)
    barData.collateralObligations.overlayClassName = "delinquency_overlay"
    const width = getTokenAmountPercentageWidth(
      breakdown.collateralObligation,
      breakdown.delinquentDebt,
    )
    barData.collateralObligations.overlayWidth = width

    barData.delinquentDebt = {
      ...MARKET_BAR_DATA.delinquentDebt,
      value: formatTokenWithCommas(breakdown.delinquentDebt),
      asset,
      width,
      color: MARKET_BAR_DATA.delinquentDebt[colorKey],
      textColor: MARKET_BAR_DATA.delinquentDebt.textColor,
    }
  } else {
    setBarData("availableToBorrow", breakdown.borrowable)
    setBarData("collateralObligations", breakdown.collateralObligation)
    setBarData("borrowed", breakdown.borrowed)
  }

  return barData
}

const HEALTHY_MARKET_BARS_ORDER = [
  MARKET_BAR_DATA.availableToBorrow.id,
  MARKET_BAR_DATA.borrowed.id,
  MARKET_BAR_DATA.collateralObligations.id,
]

const DELINQUENT_MARKET_BARS_ORDER = [
  MARKET_BAR_DATA.borrowed.id,
  "delinquentDebt",
  MARKET_BAR_DATA.collateralObligations.id,
]

export const BorrowerMarketStatusChart = ({
  market,
}: BorrowerMarketStatusChartProps) => {
  const { data: withdrawals } = useGetWithdrawals(market)

  const barRawData = generateBarData(market)

  const barOrders = market.isDelinquent
    ? DELINQUENT_MARKET_BARS_ORDER
    : HEALTHY_MARKET_BARS_ORDER

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
      <MarketBarchart data={bars.filter((b) => !b.hide)} />

      <div className="barchart__legend">
        {bars.map((chartItem) => (
          <LegendItem
            key={chartItem.label}
            chartItem={chartItem}
            expandable={
              chartItem.id === MARKET_BAR_DATA.collateralObligations.id
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
      </div>
    </div>
  )
}
