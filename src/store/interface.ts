export type BorrowerAgreementStore = {
  hasSignedAgreement: boolean
  setSignedAgreement: (isSigned: boolean) => void
}

export type WalletConnectModalStore = {
  isOpen: boolean
  setIsWalletModalOpen: (isOpen: boolean) => void
}
