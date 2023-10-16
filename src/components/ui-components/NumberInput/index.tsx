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
  } = props;
  const [inputValue, setInputValue] = useState<string | number | undefined>(value as string | number);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const processedValue = value ? processNumber(parseFloat(value), min, max) : value;

    if (typeof processedValue === 'number') {
      setInputValue(processedValue.toString()); // Преобразование числа в строку
    } else {
      setInputValue(processedValue);
    }

    if (onChange) {
      onChange(processedValue);
    }
  };

  return (
    <Input
      onChange={handleChange}
      value={value || inputValue}
      className={className || "w-48"}
      type="number"
      {...rest}
    />
  );
}
