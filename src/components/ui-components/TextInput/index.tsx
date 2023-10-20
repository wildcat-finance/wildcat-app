import { Input } from "react-aria-components"
import cn from "classnames"
import { TextInputProps } from "./interface"

export function TextInput(props: TextInputProps) {
  const { className, error, ...rest } = props

  const inputCssClass = cn(
    "h-8 px-3 text-xxs border bg-white outline-none",
    { "opacity-50": props.disabled },
    { "border-red-border": error },
    { "border-tint-9": !error },
    className,
  )

  return <Input className={inputCssClass} {...rest} />
}

// decimalScale={4}
