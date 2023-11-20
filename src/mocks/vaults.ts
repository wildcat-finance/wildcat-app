import { Vault, VaultStatus } from "../types/vaults"

export const mockedVaults: Vault[] = [
  {
    name: "Blossom Dai Stablecoin Market",
    tokenSymbol: "DAI",
    maximumCapacity: "1000",
    reserveRatio: "20",
    annualInterestRate: "5",
    status: VaultStatus.HEALTHY,
    availableCapacity: "100",
  },
  {
    name: "Wintermute Wrapped Ether Market",
    tokenSymbol: "WETH",
    maximumCapacity: "1500",
    reserveRatio: "30",
    annualInterestRate: "4",
    status: VaultStatus.HEALTHY,
    availableCapacity: "300",
  },
  {
    name: "Jump Crypto Paradise Market",
    tokenSymbol: "PARA",
    maximumCapacity: "800",
    reserveRatio: "25",
    annualInterestRate: "6",
    status: VaultStatus.PENALTY,
    availableCapacity: "345",
  },
  {
    name: "GSR Secure Token Market",
    tokenSymbol: "STT",
    maximumCapacity: "1200",
    reserveRatio: "18",
    annualInterestRate: "4.5",
    status: VaultStatus.HEALTHY,
    availableCapacity: "1005",
  },
  {
    name: "DWF Labs Digital Asset Market",
    tokenSymbol: "DAT",
    maximumCapacity: "2000",
    reserveRatio: "22",
    annualInterestRate: "5.5",
    status: VaultStatus.DELINQUENT,
    availableCapacity: "1760",
  },
  {
    name: "Eco Token Vault",
    tokenSymbol: "ECO",
    maximumCapacity: "900",
    reserveRatio: "15",
    annualInterestRate: "6.5",
    status: VaultStatus.TERMINATED,
    availableCapacity: "95",
  },
]

export const mockedVaultTypes = [
  {
    label: "Standard Loan",
    value: "standard",
  },
]

export const mockedUnderlyingAssets = mockedVaults.map(
  (vault) => vault.tokenSymbol,
)
export const mockedStatuses = [
  VaultStatus.HEALTHY,
  VaultStatus.PENALTY,
  VaultStatus.DELINQUENT,
  VaultStatus.TERMINATED,
]
