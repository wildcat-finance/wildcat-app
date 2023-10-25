import type {
  DatePickerProps as RDatePickerProps,
  DateValue,
} from "react-aria-components"

export interface DatePickerProps<T extends DateValue>
  extends RDatePickerProps<T> {
  placeholder?: string
}
