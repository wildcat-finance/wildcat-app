import { Market, TokenAmount } from "@wildcatfi/wildcat-sdk"

import {
  MarketBarchart,
  MarketBarchartLegend,
} from "../../../../components/ui-components"
import { MarketBarChartItem } from "../../../../components/ui-components/MarketBarchart/interface"
import { BorrowerMarketStatusChartProps } from "./interface"
import {
  formatTokenWithCommas,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import {
  BorrowerWithdrawalsForMarketResult,
  useGetWithdrawals,
} from "../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"

const getPercentageTokenAmount = (total: TokenAmount, amount: TokenAmount) =>
  (parseFloat(amount.toFixed(2)) * 100) / parseFloat(total.toFixed(2))

const getTokenAmountPercentageWidth = (
  total: TokenAmount,
  amount: TokenAmount,
) => `${getPercentageTokenAmount(total, amount)}%`

const generateBarData = (
  market: Market,
  withdrawals: BorrowerWithdrawalsForMarketResult,
): MarketBarChartItem[] => {
  const barData: MarketBarChartItem[] = []

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
    market.totalDelinquencyFeesAccrued ?? underlyingToken.getAmount(0)
  ).add(market.totalBaseInterestAccrued ?? 0)

  const collateralObligations = coverageLiquidity
    .add(activeWithdrawalsTotalOwed)
    .add(expiredWithdrawalsTotalOwed)

  let totalDebt = collateralObligations
    .add(borrowableAssets)
    .add(totalInterestAccrued)

  if (totalBorrowed) totalDebt = totalDebt.add(totalBorrowed)

  if (borrowableAssets.gt(0)) {
    barData.push({
      label: "Available to borrow",
      value: formatTokenWithCommas(borrowableAssets),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, borrowableAssets),
      color: "#4971FF",
    })
  }

  if (totalBorrowed && totalBorrowed.gt(0)) {
    barData.push({
      label: "Borrowed",
      value: formatTokenWithCommas(totalBorrowed),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, totalBorrowed),
      color: "#BEBECE",
    })
  }

  if (totalInterestAccrued.gt(0)) {
    barData.push({
      label: "Non-collateral Interest",
      value: formatTokenWithCommas(totalInterestAccrued),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, totalInterestAccrued),
      color: "#D6D6DE",
    })
  }

  if (collateralObligations.gt(0)) {
    barData.push({
      label: "Collateral Obligations",
      value: formatTokenWithCommas(collateralObligations),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, collateralObligations),
      color: "#EFF0F4",
      textColor: "#000000",
    })
  }

  return barData
}

export const BorrowerMarketStatusChart = ({
  market,
}: BorrowerMarketStatusChartProps) => {
  const { data } = useGetWithdrawals(market)

  const barData = generateBarData(market, data)

  return (
    <div className="mb-14">
      <div className="flex mb-6 justify-between text-base font-bold">
        <div>Total Debt:</div>
        {market.totalBorrowed && (
          <div>{formatTokenWithCommas(market.totalBorrowed, true)}</div>
        )}
      </div>
      <MarketBarchart data={barData} />
      <MarketBarchartLegend data={barData} />
    </div>
  )
}
