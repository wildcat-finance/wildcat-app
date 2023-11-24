export type ModalProps = {
  children: React.ReactNode
  onClick?: () => void
  onClose?: () => void
  isOpen?: boolean
  showFooter?: boolean
  isLoading?: boolean
  loadingText?: string
  firstBtnText?: string
  hasSignIcon?: boolean
}
