import { useState } from 'react'
import { Input } from "../Input";
import { NumberInputProps } from "./interface";

function cleanNumberInput(input: string): number {
  const numbersOnly = input.replace(/[^0-9-]/g, '');
  const cleanedInput = numbersOnly.replace(/^0+(?=\d)|^-(?=\d)/, '');
  if (cleanedInput === '' || cleanedInput === '-') {
    return 0; 
  }

  return parseFloat(cleanedInput);
}

function processNumber(input: string, minNumber?: number, maxValue?: number): number {
  const cleanedNumbedInput = cleanNumberInput(input)

  if (minNumber !== undefined && cleanedNumbedInput < minNumber) {
    return minNumber;
  } else if (maxValue && cleanedNumbedInput > maxValue) {
    return maxValue;
  }

  return cleanedNumbedInput;
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const processedValue = value ? processNumber(value, Number(min), Number(max)) : value;

    if (onChange) {
      onChange(processedValue)
    }

    setInputValue(processedValue)
  }

  return (
    <Input
      onChange={handleChange}
      value={inputValue}
      className={className || "w-48"}
      {...rest}
    />
  )
}