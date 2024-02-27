import { ChangeHandler } from "react-hook-form"

export type TokenSelectorProps = {
  className?: string
  onChange: (token: string) => void
  onBlur?: ChangeHandler
  error?: boolean
  setError: (message: string) => void
}
