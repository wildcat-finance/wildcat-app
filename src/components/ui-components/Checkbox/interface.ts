import { ChipColorVariants } from "../Chip/interface"

export type CheckboxChipProps = {
  chipColor: ChipColorVariants
  chipClassName?: string
  label: string
  labelClassName?: string
  spanClassName?: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  name?: string
  id?: string
}
