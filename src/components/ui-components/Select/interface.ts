import { ChangeHandler } from "react-hook-form"

export type SelectOptionItem = {
  value: string
  id: string
  label: string
}

export type SelectProps = {
  selected: SelectOptionItem | null
  onChange: (value: SelectOptionItem | null) => void
  onBlur?: ChangeHandler
  options: SelectOptionItem[]
  placeholder?: string
  className?: string
  noneOption?: boolean
}
