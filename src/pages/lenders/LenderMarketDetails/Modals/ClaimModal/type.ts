export type ClaimModalProps = {
  onClose?: () => void
  claim: () => void
  isLoading?: boolean
  isOpen?: boolean
  disabled?: boolean
  claimableAmount: string
  tokenSymbol: string
}
