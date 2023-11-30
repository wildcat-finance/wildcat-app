export type WithdrawalModalProps = {
  onClose?: () => void
  withdraw: () => void
  isLoading?: boolean
  isOpen?: boolean
  disabled?: boolean
  withdrawableAmount: string
  outstandingLoan: string
  tokenSymbol: string
}
