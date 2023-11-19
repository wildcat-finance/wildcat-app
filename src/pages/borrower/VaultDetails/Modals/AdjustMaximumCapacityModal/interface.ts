import { TokenAmount } from "@wildcatfi/wildcat-sdk"

export type AdjustMaximumCapacityModalProps = {
  onClose?: () => void
  isOpen?: boolean
  currentMaxTotalSupply: TokenAmount
  newtMaxTotalSupply: TokenAmount
  isLoading: boolean
  adjustMaxTotalSupply: () => void
}
