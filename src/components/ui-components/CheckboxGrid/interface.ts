export type CheckboxOption<V extends string> = {
  value: V
  id: string
  label: string
}

export type CheckboxGridProps<V extends string = string> = {
  onChange: (o: CheckboxOption<V>, checked: boolean) => void
  selected: V[]
  options: CheckboxOption<V>[]
}
