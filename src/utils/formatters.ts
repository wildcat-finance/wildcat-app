import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils"
import { MarketParameters } from "@wildcatfi/wildcat-sdk"

// <---- MARKET PARAMETERS FORMATTERS ---->
export const TOKEN_AMOUNT_DECIMALS = 4
export const MARKET_PERCENTAGE_PARAM_DECIMALS = 2

export const MARKET_PARAMS_DECIMALS: Partial<{
  [key in keyof MarketParameters]: number
}> = {
  maxTotalSupply: TOKEN_AMOUNT_DECIMALS,
  reserveRatioBips: MARKET_PERCENTAGE_PARAM_DECIMALS,
  annualInterestBips: MARKET_PERCENTAGE_PARAM_DECIMALS,
  delinquencyFeeBips: MARKET_PERCENTAGE_PARAM_DECIMALS,
  delinquencyGracePeriod: 1,
  withdrawalBatchDuration: 1,
}

export const formatToken = (bigNum: BigNumber) =>
  Number(formatUnits(bigNum, 18).toString()).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })

export const formatBps = (bps: number, fixed?: number) =>
  (bps / 100).toFixed(fixed || 2)

// <---- TOKEN PARAMETERS FORMATTERS ---->
export const trimAddress = (address: string) =>
  `${address.slice(0, 2)}..${address.slice(-4, address.length)}`
export const getTokenAmount = (amount: BigNumber, decimals: number) =>
  amount.div(BigNumber.from(decimals))
export const stringifyTokenAmount = (amount: BigNumber, decimals: number) =>
  getTokenAmount(amount, decimals).toString()
export const numberifyTokenAmount = (amount: BigNumber, decimals: number) =>
  getTokenAmount(amount, decimals).toNumber()

// <---- HOURS PARAMETERS FORMATTERS ---->
export const formatSecsToHours = (seconds: number) => {
  const hours = seconds / 60 / 60

  return hours.toFixed(1)
}
