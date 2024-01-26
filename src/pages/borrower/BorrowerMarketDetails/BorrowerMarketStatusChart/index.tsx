import { Market, TokenAmount } from "@wildcatfi/wildcat-sdk"

import { MarketBarchart } from "../../../../components/ui-components/MarketBarchart"
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
  } = market
  const { activeWithdrawalsTotalOwed, expiredWithdrawalsTotalOwed } =
    withdrawals

  const collateralObligations = coverageLiquidity
    .add(activeWithdrawalsTotalOwed)
    .add(expiredWithdrawalsTotalOwed)

  let totalDebt = collateralObligations.add(borrowableAssets)

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

  if (collateralObligations.gt(0)) {
    barData.push({
      label: "Collateral Obligations",
      value: formatTokenWithCommas(collateralObligations),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, collateralObligations),
      color: "#EFF0F4",
    })
  }

  return barData
}

export const BorrowerMarketStatusChart = ({
  market,
}: BorrowerMarketStatusChartProps) => {
  const { data } = useGetWithdrawals(market)

  const barData = generateBarData(market, data)

  return <MarketBarchart data={barData} />
}
