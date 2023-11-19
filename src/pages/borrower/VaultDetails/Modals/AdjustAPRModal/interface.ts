export type AdjustAprModalProps = {
  disabled?: boolean
  currentAPR: number
  newAPR: number
  newReserveRatio: number | undefined
  reserveRatioChanged: boolean
  isLoading: boolean
  adjustAPR: () => void
}
