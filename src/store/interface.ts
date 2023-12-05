export type AgreementStore = {
  hasSignedAgreement: boolean
  setSignedAgreement: (isSigned: boolean) => void
}

export type WalletConnectModalStore = {
  isOpen: boolean
  setIsWalletModalOpen: (isOpen: boolean) => void
}

export type txStore = {
  isTxInProgress: boolean
  setisTxInProgress: (tx: boolean) => void
}
