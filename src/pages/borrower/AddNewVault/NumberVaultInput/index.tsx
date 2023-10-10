import { useController } from "react-hook-form";
import { FormItem } from "../../../../components/ui-components/FormItem";
import { Input } from "../../../../components/ui-components/Input";
import { NumberVaultInputProps } from "./interface";

const NumberVaultInput = ({control, formErrors, name, inputClass = "w-48", endDecorator, label, tooltip}: NumberVaultInputProps) => {

  const { field: {onChange, ...rest} } = useController({
    name: name,
    control,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    onChange(parseFloat(event.target.value))
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
      <Input {...rest} onChange={handleChange} className={inputClass} error={Boolean(formErrors[name]?.message)} type="number" />
    </FormItem>
  )
}

export default NumberVaultInput