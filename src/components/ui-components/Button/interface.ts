import { ReactNode } from "react"
import { AriaButtonOptions } from "react-aria"

export type ButtonProps = AriaButtonOptions<"button"> & {
  variant?:
    | "green"
    | "brown"
    | "black"
    | "blue"
    | "glacier"
    | "gold"
    | "white-brown"
    | "red"
    | "grey"
    | "outline"
    | "silver"
    | "orange"
  disabled?: boolean
  children?: ReactNode
  onClick?: () => void
  className?: string
  icon?: ReactNode
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
}
