import { MarketAccount } from "@wildcatfi/wildcat-sdk"

export type BorrowModalProps = {
  disabled: boolean
  borrowAmount: string
  leftBorrowAmount: string
  tokenSymbol: string
  isLoading: boolean
  borrow: () => void
}
