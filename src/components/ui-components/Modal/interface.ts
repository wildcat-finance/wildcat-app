export type ModalProps = {
  buttonName: string
  buttonColor:
    | "green"
    | "brown"
    | "black"
    | "blue"
    | "gold"
    | "white-brown"
    | "red"
    | "grey"
    | "outline"
  buttonClassName?: string
  children: React.ReactNode
  sign?: boolean
  onClose?: () => void
}
