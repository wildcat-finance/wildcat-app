import { forwardRef, ChangeEvent } from "react"
import { Combobox as HCombobox } from "@headlessui/react"
import cn from "classnames"

import { ComboboxItem, ComboboxProps } from "./interface"

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  ({ value, onSelect, onSearch, options, onBlur, error }, ref) => {
    const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
      const { value: evtValue } = evt.target
      onSearch(evtValue)
    }

    const inputCss = cn(
      "h-8 px-3 text-xxs border bg-white outline-none w-72",
      { "border-red-border": error },
      { "border-tint-9": !error },
    )

    return (
      <HCombobox value={value} onChange={onSelect}>
        <HCombobox.Input
          ref={ref}
          onBlur={onBlur}
          className={inputCss}
          displayValue={(newVal: ComboboxItem | null) => newVal?.label || ""}
          onChange={handleSearch}
        />

        <HCombobox.Options>
          {options.map((option) => (
            <HCombobox.Option
              key={option.id}
              value={option}
              className="w-72 h-8 px-3 border border-tint-9 border-t-0 bg-white text-xxs flex items-center gap-x-2.5"
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <img
                  src={option.icon}
                  alt={option.label}
                  className="w-6 h-6 rounded-full"
                />
              </div>
              {option.label}
            </HCombobox.Option>
          ))}
        </HCombobox.Options>
      </HCombobox>
    )
  },
)
