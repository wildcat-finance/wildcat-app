import cn from "classnames"
import { Chip } from "../Chip"
import { CheckboxChipProps } from "./interface"

export const Checkbox = ({
  chipColor,
  chipClassName,
  inputClassName,
  label,
  labelClassName,
  spanClassName,
  checked,
  onChange,
  value,
  name,
  id,
}: CheckboxChipProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation()
      onChange({ target: { value, checked: !checked } })
    }
  }
  return (
    <Chip
      color={chipColor}
      className={cn(
        `!h-6 flex flex-row justify-between cursor-pointer`,
        chipClassName,
      )}
      onClick={handleClick}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          if (e.currentTarget === e.target) {
            e.stopPropagation()
            onChange(e)
          }
        }}
        value={value}
        name={name}
        className={cn("cursor-pointer", inputClassName)}
      />
      <label htmlFor={id} className={cn("cursor-pointer", labelClassName)}>
        <span className={cn("text-xs", spanClassName)}>{label}</span>
      </label>
    </Chip>
  )
}
