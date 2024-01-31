import { Market, TokenAmount } from "@wildcatfi/wildcat-sdk"
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
): {
  [key: string]: MarketBarChartItem
} => {
  const barData: {
    [key: string]: MarketBarChartItem
  } = {}

  const {
    // totalBorrowed,
    // borrowableAssets,
    underlyingToken,
    // totalDelinquencyFeesAccrued,
    // totalBaseInterestAccrued,
  } = market

  const marketBarchartData = market.getTotalDebtBreakdown()

  let borrowableSDK
  let borrowedSDK
  let collateralObligationsSDK
  let delinquentDebtSDK
  let reservesSDK

  if (marketBarchartData.status === "healthy") {
    borrowableSDK = marketBarchartData.borrowable
    borrowedSDK = marketBarchartData.borrowed
    collateralObligationsSDK = marketBarchartData.collateralObligation
  } else {
    borrowedSDK = marketBarchartData.borrowed
    delinquentDebtSDK = marketBarchartData.delinquentDebt
    reservesSDK = marketBarchartData.reserves
    collateralObligationsSDK = marketBarchartData.collateralObligation
  }

  // const totalInterestAccrued = (
  //   totalDelinquencyFeesAccrued ?? underlyingToken.getAmount(0)
  // ).add(totalBaseInterestAccrued ?? 0)

  // let totalDebt = collateralObligationsSDK
  //   .add(borrowableAssets)
  //   .add(totalInterestAccrued)
  // if (totalBorrowed) totalDebt = totalDebt.add(totalBorrowed)

  let totalDebtSDK = collateralObligationsSDK.add(borrowedSDK)
  if (borrowableSDK) totalDebtSDK = totalDebtSDK.add(borrowableSDK)

  if (borrowableSDK && borrowableSDK.gt(0)) {
    barData[MARKET_BAR_DATA.availableToBorrow.id] = {
      id: MARKET_BAR_DATA.availableToBorrow.id,
      label: MARKET_BAR_DATA.availableToBorrow.label,
      value: formatTokenWithCommas(borrowableSDK),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebtSDK, borrowableSDK),
      color: MARKET_BAR_DATA.availableToBorrow.healthyBgColor,
    }
  }

  if (borrowedSDK && borrowedSDK.gt(0)) {
    barData[MARKET_BAR_DATA.borrowed.id] = {
      id: MARKET_BAR_DATA.borrowed.id,
      label: MARKET_BAR_DATA.borrowed.label,
      value: formatTokenWithCommas(borrowedSDK),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebtSDK, borrowedSDK),
      color: MARKET_BAR_DATA.borrowed.healthyBgColor,
    }
  }

  if (collateralObligationsSDK.gt(0)) {
    barData[MARKET_BAR_DATA.collateralObligations.id] = {
      id: MARKET_BAR_DATA.collateralObligations.id,
      label: MARKET_BAR_DATA.collateralObligations.label,
      value: formatTokenWithCommas(collateralObligationsSDK),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(
        totalDebtSDK,
        collateralObligationsSDK,
      ),
      color: MARKET_BAR_DATA.collateralObligations.healthyBgColor,
      textColor: MARKET_BAR_DATA.collateralObligations.textColor,
    }
  }

  // if (totalInterestAccrued.gt(0)) {
  //   barData[MARKET_BAR_DATA.nonCollateralInterest.id] = {
  //     id: MARKET_BAR_DATA.nonCollateralInterest.id,
  //     label: MARKET_BAR_DATA.nonCollateralInterest.label,
  //     value: formatTokenWithCommas(totalInterestAccrued),
  //     asset: underlyingToken.symbol,
  //     width: getTokenAmountPercentageWidth(totalDebt, totalInterestAccrued),
  //     color: MARKET_BAR_DATA.nonCollateralInterest.healthyBgColor,
  //     textColor: MARKET_BAR_DATA.nonCollateralInterest.textColor,
  //   }
  // }

  if (delinquentDebtSDK && delinquentDebtSDK.gt(0)) {
    barData[MARKET_BAR_DATA.delinquentDebt.id] = {
      id: MARKET_BAR_DATA.delinquentDebt.id,
      label: MARKET_BAR_DATA.delinquentDebt.label,
      value: formatTokenWithCommas(delinquentDebtSDK),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebtSDK, delinquentDebtSDK),
      color: MARKET_BAR_DATA.delinquentDebt.delinquentBgColor,
    }
  }

  if (reservesSDK && reservesSDK.gt(0)) {
    barData[MARKET_BAR_DATA.currentReserves.id] = {
      id: MARKET_BAR_DATA.currentReserves.id,
      label: MARKET_BAR_DATA.currentReserves.label,
      value: formatTokenWithCommas(reservesSDK),
      asset: underlyingToken.symbol,
      width: getTokenAmountPercentageWidth(totalDebtSDK, reservesSDK),
      color: MARKET_BAR_DATA.currentReserves.delinquentBgColor,
      textColor: MARKET_BAR_DATA.currentReserves.textColor,
    }
  }

  return barData
}
