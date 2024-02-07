import { MarketAccount, TokenAmount } from "@wildcatfi/wildcat-sdk"
import { formatEther } from "ethers/lib/utils"
import { BigNumber } from "ethers"
import { MarketBarChartItem } from "../../../../../components/ui-components/Barchart/BarItem/interface"
import { MARKET_BAR_DATA } from "../constants"
import { formatTokenWithCommas } from "../../../../../utils/formatters"

const ONE_HUNDRED_E18 = BigNumber.from(10).pow(20)
const getPercentageTokenAmount = (total: TokenAmount, amount: TokenAmount) =>
  total.eq(0)
    ? 0
    : parseFloat(formatEther(amount.raw.mul(ONE_HUNDRED_E18).div(total.raw)))

const getTokenAmountPercentageWidth = (
  total: TokenAmount,
  amount: TokenAmount,
) => `${getPercentageTokenAmount(total, amount)}`

export const useGenerateBarData = (
  account: MarketAccount,
): {
  [key: string]: MarketBarChartItem & { hide?: boolean }
} => {
  const barData: {
    [key: string]: MarketBarChartItem & { hide?: boolean }
  } = {}
  const { market } = account
  const asset = market.underlyingToken.symbol

  const total = market.maxTotalSupply

  const colorKey = "healthyBgColor"

  const setBarData = (
    field: keyof typeof MARKET_BAR_DATA,
    value: TokenAmount,
    forceDisplay = false,
  ) => {
    if (value.lte(0) && total.gt(0) && !forceDisplay) return
    const { id, label, [colorKey]: color } = MARKET_BAR_DATA[field]
    barData[id] = {
      id,
      label,
      value: formatTokenWithCommas(value),
      asset,
      width: getTokenAmountPercentageWidth(total, value),
      color: total.gt(0) ? color : "transparent",
    }
  }

  // Always display "my loan" and "other loans" if either is non-zero
  setBarData("myLoan", account.marketBalance, market.totalSupply.gt(0))
  setBarData(
    "otherLoans",
    market.totalSupply.sub(account.marketBalance),
    market.totalSupply.gt(0),
  )
  setBarData("availableToLend", market.maximumDeposit, true)

  return barData
}
