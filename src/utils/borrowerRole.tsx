import { Market } from "@wildcatfi/wildcat-sdk"
import { TbLockCheck, TbLock } from "react-icons/tb"
import { useAccount } from "wagmi"
import { Tooltip } from "../components/ui-components"

export function getBorrowerRoleIcon(market: Market) {
  const { address } = useAccount()
  if (address === market.borrower) {
    return (
      <Tooltip content="Your market">
        <TbLockCheck className="text-lg" color="green" />
      </Tooltip>
    )
  }
  return (
    <Tooltip content="Not your market">
      <TbLock className="text-lg" color="red" />
    </Tooltip>
  )
}
