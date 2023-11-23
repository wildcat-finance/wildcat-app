export type BorrowModalProps = {
  onClose?: () => void
  isOpen?: boolean
  borrowAmount: string
  leftBorrowAmount: string
  tokenSymbol: string
  isLoading: boolean
  borrow: () => void
}
