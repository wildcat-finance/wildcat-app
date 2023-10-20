import { useRef } from "react"
import cn from "classnames"

import { useTextField } from "react-aria"
import { InputProps } from "./interface"
import { Tooltip } from "../Tooltip"

export function FormItem(props: InputProps) {
  const {
    label,
    className,
    tooltip,
    children,
    endDecorator,
    error,
    errorText,
  } = props

  const ref = useRef(null)
  const { labelProps } = useTextField(props, ref)

  return (
    <div className={cn("flex flex-col relative", className)}>
      <div className="flex justify-between w-full items-start">
        <label {...labelProps} className="font-bold text-xxs mb-2">
          {label}
        </label>
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className="flex">
        {children}
        {endDecorator}
      </div>
      {error && errorText && (
        <p className="text-red-error text-xxs mt-1 absolute bottom-0 left-0">
          {errorText}
        </p>
      )}
    </div>
  )
}
