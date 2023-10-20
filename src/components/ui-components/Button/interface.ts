import { ReactNode } from "react"

export type ButtonProps = {
  variant:
    | "green"
    | "brown"
    | "black"
    | "blue"
    | "gold"
    | "white-brown"
    | "red"
    | "grey"
  disabled?: boolean
  children?: ReactNode
  onClick?: () => void
  className?: string
  icon?: ReactNode
}
