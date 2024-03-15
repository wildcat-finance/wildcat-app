import cn from "classnames"
import { Chip } from "../Chip"
import { CheckboxChipProps } from "./interface"

export const Checkbox = ({
  chipColor,
  chipClassName,
  label,
  labelClassName,
  spanClassName,
  checked,
  onChange,
  value,
  name,
  id,
}: CheckboxChipProps) => (
  <Chip
    color={chipColor}
    className={cn(`!h-6 flex flex-row justify-between gap-x-1`, chipClassName)}
  >
    <label htmlFor={id} className={labelClassName}>
      <span className={cn("text-xs", spanClassName)}>{label}</span>
    </label>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      value={value}
      name={name}
    />
  </Chip>
)
