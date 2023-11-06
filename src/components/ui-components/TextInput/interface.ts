import type { InputProps } from "react-aria-components"
import { InputHTMLAttributes } from "react"

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  error?: boolean
}
