import { LenderRole, MarketAccount } from "@wildcatfi/wildcat-sdk"
import { TbLockCheck, TbLockPause, TbLockDown, TbLock } from "react-icons/tb"
import { ChipColorVariants } from "../components/ui-components/Chip/interface"
import { LenderStatus } from "../types/vaults"
import { Tooltip } from "../components/ui-components"

export const getEffectiveLenderRole = (
  account: MarketAccount,
): LenderStatus => {
  if (account.role === LenderRole.Null && account.isAuthorizedOnController)
    return LenderStatus.DepositAndWithdraw
  switch (account.role) {
    case LenderRole.DepositAndWithdraw:
      return LenderStatus.DepositAndWithdraw
    case LenderRole.WithdrawOnly:
      return LenderStatus.WithdrawOnly
    case LenderRole.Blocked:
      return LenderStatus.Blocked
    case LenderRole.Null:
    default:
      return LenderStatus.Null
  }
}

export function getLenderRoleColor(account: MarketAccount): ChipColorVariants {
  const role = getEffectiveLenderRole(account)
  switch (role) {
    case LenderStatus.DepositAndWithdraw:
      return "green"
    case LenderStatus.WithdrawOnly:
      return "yellow"
    case LenderStatus.Blocked:
      return "red"
    case LenderStatus.Null:
    default:
      return "gray"
  }
}

export function getLenderRoleIcon(account: MarketAccount) {
  const role = getEffectiveLenderRole(account)
  switch (role) {
    case LenderStatus.DepositAndWithdraw:
      return (
        <Tooltip content={role}>
          <TbLockCheck className="text-lg" color="green" />
        </Tooltip>
      )
    case LenderStatus.WithdrawOnly:
      return (
        <Tooltip content={role}>
          <TbLockDown className="text-lg" color="yellow" />
        </Tooltip>
      )
    case LenderStatus.Blocked:
      return (
        <Tooltip content={role}>
          <TbLockPause className="text-lg" color="red" />
        </Tooltip>
      )
    case LenderStatus.Null:
    default:
      return (
        <Tooltip content={role}>
          <TbLock className="text-lg" color="red" />
        </Tooltip>
      )
  }
}
