import React, { forwardRef } from "react"
import { Input } from "react-aria-components"
import cn from "classnames"
import { TextInputProps } from "./interface"

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { className, error, ...rest } = props

    const inputCssClass = cn(
      "h-8 px-3 text-xxs border bg-white outline-none",
      { "opacity-50": props.disabled },
      { "border-red-border": error },
      { "border-tint-9": !error },
      className,
    )

    return <Input className={inputCssClass} {...rest} ref={ref} />
  },
)
