import { useController } from "react-hook-form";
import { FormItem } from "../../../../components/ui-components/FormItem";
import { Input } from "../../../../components/ui-components/Input";
import { NumberVaultInputProps } from "./interface";


function processNumber(input: number, minNumber?: number, maxValue?: number): number {
  if (minNumber !== undefined && input < minNumber) {
    return minNumber;
  } else if (maxValue && input > maxValue) {
    return maxValue;
  }

  return input;
}

const NumberVaultInput = (props: NumberVaultInputProps) => {
  const {
    control,
    formErrors,
    name,
    inputClass,
    endDecorator,
    label,
    tooltip,
    min = 0,
    max
  } = props

  const { field: {onChange, ...rest} } = useController({
    name: name,
    control,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    console.log('CHANGES', event.target.value)
    const { value } = event.target;
    const processedValue = value ? processNumber(parseFloat(value), min, max) : value;
    console.log('PROCESSED', processedValue)
    onChange(processedValue)
  }

  return (
    <FormItem
      label={label}
      className="mb-5 pb-4"
      tooltip={tooltip}
      endDecorator={endDecorator}
      error={Boolean(formErrors[name]?.message)}
      errorText={formErrors[name]?.message}
    >
      <Input {...rest} onChange={handleChange} className={inputClass ||  "w-48"} error={Boolean(formErrors[name]?.message)} type="number" />
    </FormItem>
  )
}

export default NumberVaultInput