export type Lender = {
  lenderName: string
  lenderWallet: string
}

export type RemoveLendersModalProps = {
  lenders: Lender[]
}
