import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils"
import {
  MarketParameterConstraints,
  MarketParameters,
  stripTrailingZeroes,
} from "@wildcatfi/wildcat-sdk"
import dayjs from "dayjs"

// <---- MARKET PARAMETERS FORMATTERS ---->
export const TOKEN_FORMAT_DECIMALS = 4
export const MARKET_PERCENTAGE_PARAM_DECIMALS = 2

export const MARKET_PARAMS_DECIMALS: Partial<{
  [key in keyof MarketParameters]: number
}> = {
  maxTotalSupply: TOKEN_FORMAT_DECIMALS,
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

export const formatBps = (bps: number, fixed?: number) => {
  const fixedNum = (bps / 100).toFixed(fixed || 2)

  return stripTrailingZeroes(fixedNum)
}

// <---- TOKEN PARAMETERS FORMATTERS ---->
export const trimAddress = (
  address: string,
  maxLength: number | undefined = 6,
) =>
  `${address.slice(0, 6)}..${address.slice(-(maxLength - 2), address.length)}`

export const formatTokenAmount = (
  amount: BigNumber,
  tokenDecimals: number,
  formatDecimalsLimit: number | undefined = 2,
) => {
  const formattedAmount = formatUnits(amount, tokenDecimals)

  return formatDecimalsLimit
    ? Number(formattedAmount).toFixed(formatDecimalsLimit)
    : formattedAmount
}

// <---- HOURS PARAMETERS FORMATTERS ---->
export const formatSecsToHours = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let timeString = ""

  if (hours > 0) {
    timeString += `${hours} hour${hours > 1 ? "s" : ""} `
  }
  if (minutes > 0) {
    timeString += `${minutes} minute${minutes > 1 ? "s" : ""} `
  }
  if (remainingSeconds > 0 || timeString === "") {
    timeString += `${remainingSeconds} sec${remainingSeconds > 1 ? "s" : ""}`
  }

  return timeString.trim()
}

// <---- TIMESTAMP TO DATE FORMATTERS ---->
export const DATE_FORMAT = "DD-MMM-YYYY HH:mm"
export const timestampToDateFormatted = (timestamp: number) =>
  dayjs(timestamp * 1000).format(DATE_FORMAT)

// <---- MARKET CONSTRAINTS ---->
const CONSTRAINTS_IN_SECONDS: Array<keyof MarketParameterConstraints> = [
  "minimumDelinquencyGracePeriod",
  "maximumDelinquencyGracePeriod",
  "minimumWithdrawalBatchDuration",
  "maximumWithdrawalBatchDuration",
]

export function formatConstrainToNumber(
  constraints: MarketParameterConstraints,
  key: keyof MarketParameterConstraints,
) {
  if (CONSTRAINTS_IN_SECONDS.indexOf(key) !== -1) {
    return constraints[key] / 60 / 60
  }

  return constraints[key] / 100
}
