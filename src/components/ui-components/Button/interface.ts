import { ReactNode } from "react"
import { AriaButtonOptions } from "react-aria"

export type ButtonProps = AriaButtonOptions<"button"> & {
  variant?:
    | "green"
    | "brown"
    | "black"
    | "blue"
    | "gold"
    | "white-brown"
    | "red"
    | "grey"
    | "outline"
  disabled?: boolean
  children?: ReactNode
  onClick?: () => void
  className?: string
  icon?: ReactNode
}
