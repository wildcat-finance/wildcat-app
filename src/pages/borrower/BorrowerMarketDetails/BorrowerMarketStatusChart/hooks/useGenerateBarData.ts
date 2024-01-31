import { Market, TokenAmount } from "@wildcatfi/wildcat-sdk"
import { BorrowerWithdrawalsForMarketResult } from "../../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"
import { MarketBarChartItem } from "../../../../../components/ui-components/Barchart/MarketBarchart/interface"
import { MARKET_BAR_DATA } from "../constants"
import { formatTokenWithCommas } from "../../../../../utils/formatters"

const getPercentageTokenAmount = (total: TokenAmount, amount: TokenAmount) =>
  (parseFloat(amount.toFixed(2)) * 100) / parseFloat(total.toFixed(2))

const getTokenAmountPercentageWidth = (
  total: TokenAmount,
  amount: TokenAmount,
) => `${getPercentageTokenAmount(total, amount)}%`

export const useGenerateBarData = (
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
    delinquentDebt,
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

  if (delinquentDebt.gt(0)) {
    barData[MARKET_BAR_DATA.delinquentDebt.id] = {
      id: MARKET_BAR_DATA.delinquentDebt.id,
      label: MARKET_BAR_DATA.delinquentDebt.label,
      value: formatTokenWithCommas(delinquentDebt),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, delinquentDebt),
      color: MARKET_BAR_DATA.delinquentDebt.delinquentBgColor,
    }
  }

  if (coverageLiquidity.gt(0)) {
    barData[MARKET_BAR_DATA.currentReserves.id] = {
      id: MARKET_BAR_DATA.currentReserves.id,
      label: MARKET_BAR_DATA.currentReserves.label,
      value: formatTokenWithCommas(coverageLiquidity),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebt, coverageLiquidity),
      color: MARKET_BAR_DATA.currentReserves.delinquentBgColor,
      textColor: MARKET_BAR_DATA.currentReserves.textColor,
    }
  }

  return barData
}
