import { Market } from "@wildcatfi/wildcat-sdk"
import { NumberInputProps } from "../NumberInput/interface"

export type DetailsInputType = NumberInputProps & {
  market: Market
  errorText?: string | undefined
  wariningText?: string | undefined
  helperText?: string
  helperValue?: string
}
