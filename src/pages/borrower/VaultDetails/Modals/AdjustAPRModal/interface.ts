export type AdjustAprModalProps = {
  onClose?: () => void
  isOpen?: boolean
  currentAPR: number
  newAPR: number
  newReserveRatio: number | undefined
  reserveRatioChanged: boolean
  isLoading: boolean
  adjustAPR: () => void
}
