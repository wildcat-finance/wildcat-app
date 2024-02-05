import { Market, TokenAmount } from "@wildcatfi/wildcat-sdk"
import { MarketBarChartItem } from "../../../../../components/ui-components/Barchart/MarketBarchart/interface"
import { MARKET_BAR_DATA } from "../constants"
import { formatTokenWithCommas } from "../../../../../utils/formatters"

const getPercentageTokenAmount = (total: TokenAmount, amount: TokenAmount) => {
  console.log(
    "DEBUG getPercentageTokenAmount",
    parseFloat(amount.toFixed(2)) * 100,
    parseFloat(total.toFixed(2)),
    (parseFloat(amount.toFixed(2)) * 100) / parseFloat(total.toFixed(2)),
  )

  return (parseFloat(amount.toFixed(2)) * 100) / parseFloat(total.toFixed(2))
}

const getTokenAmountPercentageWidth = (
  total: TokenAmount,
  amount: TokenAmount,
) => `${getPercentageTokenAmount(total, amount)}`

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

  console.log("DEBUG breakdown", breakdown)

  console.log("DEBUG breakdown formatter", {
    borrowed: breakdown.borrowed.format(),
    collateralObligation: breakdown.collateralObligation.format(),
    currentReserves:
      breakdown.status === "delinquent" && breakdown.reserves.format(),
    totalDebts: totalDebt.format(),
  })

  const colorKey =
    breakdown.status === "healthy" ? "healthyBgColor" : "delinquentBgColor"

  const setBarData = (
    field: keyof typeof MARKET_BAR_DATA,
    value: TokenAmount,
  ) => {
    if (value.lte(0) && totalDebt.gt(0)) return
    const { id, label, [colorKey]: color } = MARKET_BAR_DATA[field]
    barData[id] = {
      id,
      label,
      value: formatTokenWithCommas(value),
      asset,
      width: getTokenAmountPercentageWidth(totalDebt, value),
      color: totalDebt.gt(0) ? color : "transparent",
    }
  }
  if (breakdown.status === "delinquent") {
    setBarData("collateralObligations", breakdown.collateralObligation)
    setBarData("delinquentDebt", breakdown.delinquentDebt)
    setBarData("currentReserves", breakdown.reserves)
    setBarData("borrowed", breakdown.borrowed)
  } else {
    setBarData("availableToBorrow", breakdown.borrowable)
    setBarData("collateralObligations", breakdown.collateralObligation)
    setBarData("borrowed", breakdown.borrowed)
  }

  return barData
}
