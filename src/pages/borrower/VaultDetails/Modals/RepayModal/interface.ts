export type RepayModalProps = {
  disabled: boolean
  repayAmount: string
  newMarketReserve: string
  tokenSymbol: string
  isLoading: boolean
  repay: () => void
}
