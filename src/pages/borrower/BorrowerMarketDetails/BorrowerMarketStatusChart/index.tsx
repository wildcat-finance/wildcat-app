import { Market, TokenAmount } from "@wildcatfi/wildcat-sdk"

import {
  MarketBarchart,
  LegendItem,
} from "../../../../components/ui-components"
import { MarketBarChartItem } from "../../../../components/ui-components/Barchart/MarketBarchart/interface"
import { BorrowerMarketStatusChartProps } from "./interface"
import { formatTokenWithCommas } from "../../../../utils/formatters"
import {
  BorrowerWithdrawalsForMarketResult,
  useGetWithdrawals,
} from "../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"
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
  withdrawals: BorrowerWithdrawalsForMarketResult,
): {
  [key: string]: MarketBarChartItem
} => {
  const barData: {
    [key: string]: MarketBarChartItem
  } = {}

  const {
    totalBorrowed,
    borrowableAssets,
    coverageLiquidity,
    underlyingToken,
    totalDelinquencyFeesAccrued,
    totalBaseInterestAccrued,
  } = market
  const { activeWithdrawalsTotalOwed, expiredWithdrawalsTotalOwed } =
    withdrawals

  const totalInterestAccrued = (
    totalDelinquencyFeesAccrued ?? underlyingToken.getAmount(0)
  ).add(totalBaseInterestAccrued ?? 0)

  const collateralObligations = coverageLiquidity
    .add(activeWithdrawalsTotalOwed)
    .add(expiredWithdrawalsTotalOwed)

  let totalDebt = collateralObligations
    .add(borrowableAssets)
    .add(totalInterestAccrued)

  if (totalBorrowed) totalDebt = totalDebt.add(totalBorrowed)

  if (borrowableAssets.gt(0)) {
    barData[MARKET_BAR_DATA.availableToBorrow.id] = {
      id: MARKET_BAR_DATA.availableToBorrow.id,
      label: MARKET_BAR_DATA.availableToBorrow.label,
      value: formatTokenWithCommas(borrowableAssets),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, borrowableAssets),
      color: MARKET_BAR_DATA.availableToBorrow.healthyBgColor,
    }
  }

  if (totalBorrowed && totalBorrowed.gt(0)) {
    barData[MARKET_BAR_DATA.borrowed.id] = {
      id: MARKET_BAR_DATA.borrowed.id,
      label: MARKET_BAR_DATA.borrowed.label,
      value: formatTokenWithCommas(totalBorrowed),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, totalBorrowed),
      color: MARKET_BAR_DATA.borrowed.healthyBgColor,
    }
  }

  if (collateralObligations.gt(0)) {
    barData[MARKET_BAR_DATA.collateralObligations.id] = {
      id: MARKET_BAR_DATA.collateralObligations.id,
      label: MARKET_BAR_DATA.collateralObligations.label,
      value: formatTokenWithCommas(collateralObligations),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, collateralObligations),
      color: MARKET_BAR_DATA.collateralObligations.healthyBgColor,
      textColor: MARKET_BAR_DATA.collateralObligations.textColor,
    }
  }

  if (totalInterestAccrued.gt(0)) {
    barData[MARKET_BAR_DATA.nonCollateralInterest.id] = {
      id: MARKET_BAR_DATA.nonCollateralInterest.id,
      label: MARKET_BAR_DATA.nonCollateralInterest.label,
      value: formatTokenWithCommas(totalInterestAccrued),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, totalInterestAccrued),
      color: MARKET_BAR_DATA.nonCollateralInterest.healthyBgColor,
      textColor: MARKET_BAR_DATA.nonCollateralInterest.textColor,
    }
  }

  return barData
}

const HEALTHY_MARKET_BARS_ORDER = [
  MARKET_BAR_DATA.availableToBorrow.id,
  MARKET_BAR_DATA.borrowed.id,
  MARKET_BAR_DATA.collateralObligations.id,
  MARKET_BAR_DATA.nonCollateralInterest.id,
]

const DELINQUENT_MARKET_BARS_ORDER = [
  MARKET_BAR_DATA.collateralObligations.id,
  MARKET_BAR_DATA.nonCollateralInterest.id,
]

export const BorrowerMarketStatusChart = ({
  market,
}: BorrowerMarketStatusChartProps) => {
  const { data: withdrawals } = useGetWithdrawals(market)

  const barRawData = generateBarData(market, withdrawals)

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
          <div>{formatTokenWithCommas(market.totalBorrowed, true)}</div>
        )}
      </div>
      <MarketBarchart data={bars} />

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
