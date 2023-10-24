export type VaultInfoProps = {
  vault: {
    name: string
    tokenSymbol: string
    maximumCapacity: string
    reserveRatio: string
    annualInterestRate: string
    deposits: string
    amountBorrowed: string
    currentReserves: string
    currentReserveRatio: string
    requiredReserves: string
    minimumReserveRatio: string
    gracePeriod: string
    withdrawalCycle: string
    reservedAssets: string
    pendingWithdrawals: string
    accruedProtocolFees: string
    withdrawalCycleCountdown: {
      hours: number
      minutes: number
    }
    masterLoanAgreement: string
  }
  nextStep: () => void
  previousStep: () => void
  showButtons?: boolean
}
