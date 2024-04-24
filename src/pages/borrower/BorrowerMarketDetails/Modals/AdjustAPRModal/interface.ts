import { MarketAccount, SetAprStatus } from "@wildcatfi/wildcat-sdk"
import { ChangeEvent } from "react"

export type AdjustAprModalProps = {
  onClose: () => void
  isOpen?: boolean
  disabled?: boolean
  currentAPR: number
  error: string | undefined
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
  apr: string
  status: SetAprStatus | undefined
  newReserveRatio: number | undefined
  reserveRatioChanged: boolean
  isLoading: boolean
  adjustAPR: () => void
  marketAccount: MarketAccount
}
