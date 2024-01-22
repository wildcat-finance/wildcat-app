import { ChangeHandler } from "react-hook-form"

export type SelectOptionItem<T = string> = {
  value: T
  id: string
  label: string
}

export type SelectProps<
  V = string,
  O extends SelectOptionItem<V> = SelectOptionItem<V>,
> = {
  selected: O | null
  onBlur?: ChangeHandler
  options: O[]
  placeholder?: string
  className?: string
  disabled?: boolean
} & (
  | {
      noneOption: true
      onChange: (value: O | null) => void
    }
  | {
      noneOption?: false
      onChange: (value: O) => void
    }
)
