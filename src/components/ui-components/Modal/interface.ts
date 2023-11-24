export type ModalProps = {
  children: React.ReactNode
  sign?: () => void
  onClose?: () => void
  isOpen?: boolean
  showFooter?: boolean
  isLoading?: boolean
  loadingText?: string
  firstBtnText?: string
  hasSignIcon?: boolean
}
