import type { NumericFormatProps } from "react-number-format/types/types"

export type NumberInputProps = Omit<NumericFormatProps, "onValueChange"> & {
  onValueChange?: (value: number | string) => void
  error?: boolean
  min?: number | string
  max?: number | string
}
