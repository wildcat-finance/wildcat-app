import { Checkbox } from "../Checkbox"
import { CheckboxGridProps, CheckboxOption } from "./interface"

export function CheckboxGrid<V extends string>({
  onChange,
  selected,
  options,
}: CheckboxGridProps<V>) {
  const isSelected = (option: CheckboxOption<V>) =>
    selected.includes(option.value)
  return (
    <div className="grid grid-cols-6 gap-x-4 gap-y-2 mb-2 w-full">
      {options.map((o) => (
        <Checkbox
          label={o.label}
          chipColor="tint-9"
          id={o.id}
          value={o.value}
          onChange={(e) => onChange(o, e.target.checked)}
          checked={isSelected(o)}
        />
      ))}
    </div>
  )
}
