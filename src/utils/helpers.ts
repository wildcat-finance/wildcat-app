import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils"
import { VaultStatus } from "../types/vaults"
import { ChipColorVariants } from "../components/ui-components/Chip/interface"

export const getMarketStatus = (
  isClosed: boolean,
  isDelinquent: boolean,
  isIncurringPenalties: boolean,
): VaultStatus => {
  if (isIncurringPenalties) return VaultStatus.PENALTY
  if (isDelinquent) return VaultStatus.DELINQUENT
  if (isClosed) return VaultStatus.REMOVED
  return VaultStatus.TERMINATED
}

export function getVaultStatusColor(status: VaultStatus): ChipColorVariants {
  switch (status) {
    case VaultStatus.ACTIVE:
      return "green"
    case VaultStatus.PENDING:
      return "yellow"
    case VaultStatus.DELINQUENT:
    case VaultStatus.PENALTY:
    case VaultStatus.REMOVED:
      return "red"
    case VaultStatus.TERMINATED:
    default:
      return "gray"
  }
}

export const formatToken = (bigNum: BigNumber) => {
  const numberValue = Number(formatUnits(bigNum, 18).toString())
  return numberValue.toLocaleString("en-US", { minimumFractionDigits: 2 })
}
export const formatBps = (bps: number) => (bps / 100).toFixed(2)
