import { ButtonProps } from "../Button/interface"

export type ModalProps = {
  children: React.ReactNode
  onClick?: () => void
  onClose?: () => void
  isOpen?: boolean
  showFooter?: boolean
  isLoading?: boolean
  loadingText?: string
  firstBtnText?: string
  firstBtnVariant?: ButtonProps["variant"]
  firstBtnDisabled?: boolean
  hasSignIcon?: boolean
  hideButtons?: boolean
}
