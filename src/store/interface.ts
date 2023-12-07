export type AgreementStore = {
  setSlaSignature: (address: string, signature: string) => void
  setBorrowerSignature: (address: string, signature: string) => void
  [key: `sla-signature-${string}`]: string
  [key: `borrower-signature-${string}`]: string
}

export type WalletConnectModalStore = {
  isOpen: boolean
  setIsWalletModalOpen: (isOpen: boolean) => void
}

export type txStore = {
  isTxInProgress: boolean
  setisTxInProgress: (tx: boolean) => void
}
