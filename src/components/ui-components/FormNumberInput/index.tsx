import { useController } from "react-hook-form";
import { FormItem } from "../FormItem";
import { NumberInput } from "../NumberInput";
import { FormNumberInputProps } from "./interface";

export const FormNumberInput = (props: FormNumberInputProps) => {
  const {
    control,
    formErrors,
    name,
    inputClass,
    endDecorator,
    label,
    tooltip,
    min = 0,
    max,
    decimalScale
  } = props

  const { field: { onChange, ...rest } } = useController({
    name: name,
    control,
  });

  return (
    <FormItem
      label={label}
      className="mb-5 pb-4"
      tooltip={tooltip}
      endDecorator={endDecorator}
      error={Boolean(formErrors[name]?.message)}
      errorText={formErrors[name]?.message}
    >
      <NumberInput {...rest}
        onChange={onChange}
        className={inputClass}
        min={min}
        max={max}
        error={Boolean(formErrors[name]?.message)}
        decimalScale={decimalScale}
      />
    </FormItem>
  )
}