import { forwardRef } from "react"
import { NumberInput } from "../NumberInput"
import { DetailsInputType } from "./type"

export const DetailsInput = forwardRef<HTMLInputElement, DetailsInputType>(
  (props, ref) => (
    <div className="w-full">
      <NumberInput
        decimalScale={props.decimalScale}
        className={props.className}
        placeholder={props.placeholder}
        min={props.min}
        value={props.value}
        error={!!props.errorText}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        ref={ref}
        disabled={props.disabled}
      />

      <div className="flex justify-between items-start text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
        <div className="w-52 relative">
          {props.errorText && (
            <div className="absolute top-0 left-0 text-red-error text-xxs text-left">
              {props.errorText}
            </div>
          )}
        </div>
        <div>
          <span className="font-semibold">
            {props.helperText}
            {props.helperValue ? ":" : ""}{" "}
          </span>
          <br />
          {props.helperValue && props.helperValue.replace("-", " ")}
        </div>
      </div>
    </div>
  ),
)
