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
    error,
      ...rest
  } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target;
    const processedValue = value ? processNumber(parseFloat(value), min, max) : value;
    onChange(processedValue)
  }

  return (
      <Input
          onChange={handleChange}
          className={className ||  "w-48"}
          error={error}
          type="number"
          {...rest}
      />
  )
}