import { ChipColorVariants } from "../Chip/interface"

export type CheckboxChipProps = {
  chipColor: ChipColorVariants
  chipClassName?: string
  label: string
  labelClassName?: string
  spanClassName?: string
  inputClassName?: string
  checked: boolean
  onChange: (e: { target: { value: string; checked: boolean } }) => void
  value: string
  name?: string
  id?: string
}
