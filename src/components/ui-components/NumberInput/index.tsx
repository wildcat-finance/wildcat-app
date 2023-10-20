import { useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { NumberFormatValues } from "react-number-format/types/types";

import { NumberInputProps } from "./interface";
import cn from "classnames";

function processNumber(input: string, minNumber?: number, maxValue?: number): number {

  if (minNumber !== undefined && Number(input) < minNumber) {
    return minNumber;
  } else if (maxValue && Number(input) > maxValue) {
    return maxValue;
  }

  return Number(input);
}


export const NumberInput = (props: NumberInputProps) => {
  const {
    className,
    onChange,
    error,
    min = 0,
    max,
    value,
    ...rest
  } = props

  const [inputValue, setInputValue] = useState<string | number>("")

  const handleChange = (values: NumberFormatValues) => {
    const processedValue = value ? processNumber(values.value, Number(min), Number(max)) : value;

    if (onChange) {
      onChange(processedValue || 0)
    }

    setInputValue(processedValue || 0)
  }

  const inputCssClass = cn(
      'h-8 px-3 text-xxs border bg-white outline-none',
      { 'opacity-50': props.disabled },
      { 'border-red-border': error },
      { 'border-tint-9': !error },
      className,
  )

  return (
    <NumericFormat
      onValueChange={(values, _) => handleChange(values)}
      value={inputValue}
      className={inputCssClass}
      decimalSeparator={','}
      allowNegative={false}
      {...rest}
    />
  )
}