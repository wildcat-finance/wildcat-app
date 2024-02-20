import { ReactNode } from "react"
import { TokenAmount } from "@wildcatfi/wildcat-sdk"

export type TokenAmountTooltipProps = {
  children: ReactNode
  value: TokenAmount
  withSymbol?: boolean
  symbol?: string
}
