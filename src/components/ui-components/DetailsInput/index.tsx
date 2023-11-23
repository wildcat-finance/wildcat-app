import { NumberInput } from "../NumberInput"
import { DetailsInputType } from "./type"

export const DetailsInput = (props: DetailsInputType) => (
  <div className="w-full">
    <NumberInput
      decimalScale={props.decimalScale}
      className={props.className}
      placeholder={props.placeholder}
      min={props.min}
      onChange={props.onChange}
      value={props.value}
      error={!!props.errorText}
      warning={!!props.wariningText}
    />

    <div className="flex justify-between items-start text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
      <div className="w-52 relative">
        {props.errorText && (
          <div className="absolute top-0 left-0 text-red-error text-xxs text-left">
            {props.errorText}
          </div>
        )}
        {props.wariningText && (
          <div className="absolute top-0 left-0 text-yellow-500 text-xxs text-left">
            {props.wariningText}
          </div>
        )}
      </div>
      <div>
        <span className="font-semibold">{props.helperText}: </span>
        <br />
        {props.helperValue}
      </div>
    </div>
  </div>
)
