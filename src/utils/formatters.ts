import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils"
import { MarketParameters } from "@wildcatfi/wildcat-sdk"

export const MARKET_BIPS_DECIMAL_SCALES: Partial<{
  [key in keyof MarketParameters]: number
}> = {
  maxTotalSupply: 2,
  reserveRatioBips: 2,
  annualInterestBips: 2,
  delinquencyFeeBips: 2,
  delinquencyGracePeriod: 1,
  withdrawalBatchDuration: 1,
}

export const formatToken = (bigNum: BigNumber) =>
  Number(formatUnits(bigNum, 18).toString()).toFixed(4)
export const formatBps = (bps: number, fixed?: number) =>
  (bps / 100).toFixed(fixed || 2)
