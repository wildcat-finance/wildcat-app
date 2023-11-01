export type SelectOptionItem = {
  value: string
  id: string
  label: string
}

export type SelectProps = {
  onChange: (value: SelectOptionItem | null) => void
  options: SelectOptionItem[]
  placeholder?: string
  className?: string
  noneOption?: boolean
}
