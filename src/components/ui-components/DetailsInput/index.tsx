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
    />

    <div className="flex justify-between items-start text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
      <div className="w-36">
        {props.errorText && (
          <div className="text-red-error text-xxs text-left">
            {props.errorText}
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
