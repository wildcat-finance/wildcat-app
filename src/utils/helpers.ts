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
