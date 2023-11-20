export enum VaultStatus {
  HEALTHY = "Healthy",
  PENDING = "Pending",
  DELINQUENT = "Delinquent",
  PENALTY = "Penalty",
  TERMINATED = "Terminated",
  REMOVED = "Removed",
}

export type Vault = {
  name: string
  tokenSymbol: string
  maximumCapacity: string
  reserveRatio: string
  annualInterestRate: string
  status: VaultStatus
  availableCapacity: string
}
