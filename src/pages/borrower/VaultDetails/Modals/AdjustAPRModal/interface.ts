export type AdjustAprModalProps = {
  disabled?: boolean
  currentAPR: number
  newAPR: number
  newReserveRatio?: string
  isLoading: boolean
  adjustAPR: () => void
}
