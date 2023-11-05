import { forwardRef, useState } from "react"
import { NumericFormat } from "react-number-format"
import type { NumberFormatValues } from "react-number-format/types/types"

import cn from "classnames"
import { NumberInputProps } from "./interface"

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      className,
      onChange,
      onValueChange,
      error,
      min = 0,
      max,
      ...rest
    } = props

    const [inputValue, setInputValue] = useState<string>("")

    const handleValueChange = (values: NumberFormatValues) => {
      setInputValue(values.value)
    }

    const inputCssClass = cn(
      "h-8 px-3 text-xxs border bg-white outline-none",
      { "opacity-50": props.disabled },
      { "border-red-border": error },
      { "border-tint-9": !error },
      className,
    )

    return (
      <NumericFormat
        onChange={onChange}
        onValueChange={handleValueChange}
        value={inputValue}
        className={inputCssClass}
        decimalSeparator=","
        min={min}
        max={max}
        allowNegative={false}
        {...rest}
        getInputRef={ref}
      />
    )
  },
)
