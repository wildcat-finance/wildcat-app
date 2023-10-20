export type ComboboxItem = {
  value: string
  id: string
  label: string
  icon?: string
}

export type ComboboxProps = {
  value: ComboboxItem | null | undefined
  onSelect: (value: ComboboxItem) => void
  onSearch: (value: string) => void
  options: ComboboxItem[]
}
