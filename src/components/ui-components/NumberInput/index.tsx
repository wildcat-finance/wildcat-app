import { useState } from 'react'
import { Input } from "../Input";
import { NumberInputProps } from "./interface";


function processNumber(input: number, minNumber?: number, maxValue?: number): number {
  if (minNumber !== undefined && input < minNumber) {
    return minNumber;
  } else if (maxValue && input > maxValue) {
    return maxValue;
  }

  return input;
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
  const [inputValue, setInputValue] = useState<string | number | undefined>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const processedValue = value ? processNumber(parseFloat(value), min, max) : value;

    if (onChange) {
      onChange(processedValue)
    }

    setInputValue(processedValue)
  }

  return (
    <Input
      onChange={handleChange}
      value={value || inputValue}
      className={className || "w-48"}
      type="number"
      {...rest}
    />
  )
}