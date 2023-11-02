export type ModalProps = {
  children: React.ReactNode
  sign?: () => void
  onClose?: () => void
  isOpen?: boolean
}
