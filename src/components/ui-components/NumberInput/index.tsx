import { useState } from 'react'
import { NumberFormatValues } from "react-number-format/types/types";

import { Input } from "../Input";
import { NumberInputProps } from "./interface";

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

  return (
    <Input
      onValueChange={(values, _) => handleChange(values)}
      value={inputValue}
      className={className || "w-48"}
      {...rest}
    />
  )
}