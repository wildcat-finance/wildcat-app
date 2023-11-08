import { forwardRef, MouseEvent } from "react"
import { NumericFormat } from "react-number-format"
import cn from "classnames"
import { NumberInputProps } from "./interface"

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      className,
      onChange,
      error,
      min = 0,
      max,
      onMaxClick,
      ...rest
    } = props

    const inputCssClass = cn(
      "h-8 px-3 text-xxs border bg-white outline-none",
      { "opacity-50": props.disabled },
      { "border-red-border": error },
      { "border-tint-9": !error },
      className,
    )

    const handleMaxClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      onMaxClick?.()
    }

    return (
      <div className="relative">
        <NumericFormat
          onChange={onChange}
          className={inputCssClass}
          decimalSeparator="."
          isAllowed={(values) => {
            const { floatValue, value } = values

            if (value.charAt(0) === "0") {
              const secondChar = value.charAt(1)

              // Decimals are not allowed: don't allow zero to be followed by a number
              if (!rest.decimalScale && secondChar) {
                return false
              }

              // Decimals are allowed: allow zero followed only by a dot
              if (rest.decimalScale && secondChar && secondChar !== ".") {
                return false
              }
            }

            // Check if the value is bigger than the max or smaller than the min
            if (floatValue !== undefined) {
              const isBiggerThanMax = max !== undefined && floatValue > max
              const isSmallerThanMin = min !== undefined && floatValue < min

              return !isBiggerThanMax && !isSmallerThanMin
            }

            return true
          }}
          allowNegative={false}
          {...rest}
          getInputRef={ref}
        />
        {onMaxClick && (
          <button
            className="font-medium text-xxs absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
            onClick={handleMaxClick}
          >
            MAX
          </button>
        )}
      </div>
    )
  },
)
