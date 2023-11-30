export type WithdrawalModalProps = {
  onClose?: () => void
  withdraw: () => void
  isLoading?: boolean
  isOpen?: boolean
  disabled?: boolean
  withdrawAmount: string
  outstandingLoan: string
  tokenSymbol: string
}
