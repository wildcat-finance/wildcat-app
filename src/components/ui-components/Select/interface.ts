export type SelectOptionItem = {
  value: string
  id: string
  label: string
}

export type SelectProps = {
  selected: SelectOptionItem | null
  onChange: (value: SelectOptionItem | null) => void
  options: SelectOptionItem[]
  placeholder?: string
  className?: string
}
