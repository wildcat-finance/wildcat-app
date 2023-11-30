export type DepositModalProps = {
  onClose?: () => void
  deposit: () => void
  isLoading?: boolean
  isOpen?: boolean
  disabled?: boolean
  depositAmount: string
  marketCapacity: string
  tokenSymbol: string
}
