export type RepayModalProps = {
  isOpen: boolean
  onClose: () => void
  disabled?: boolean
  repayAmount: string
  newMarketReserve: string
  tokenSymbol: string
  isLoading: boolean
  repay: () => void
}
