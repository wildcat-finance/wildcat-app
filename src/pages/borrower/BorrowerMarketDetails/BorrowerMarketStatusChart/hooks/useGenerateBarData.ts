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
