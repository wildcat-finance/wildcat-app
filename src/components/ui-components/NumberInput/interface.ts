import type { NumericFormatProps } from "react-number-format/types/types"

export type NumberInputProps = Omit<NumericFormatProps, "onValueChange"> & {
  error?: boolean
  onMaxClick?: () => void
}
