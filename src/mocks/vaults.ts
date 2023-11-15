import { Vault, VaultStatus } from "../types/vaults"

export const mockedVaults: Vault[] = [
  {
    name: "Blossom Dai Stablecoin Market",
    tokenSymbol: "DAI",
    maximumCapacity: "1000",
    reserveRatio: "20",
    annualInterestRate: "5",
    status: VaultStatus.ACTIVE,
    availableCapacity: "100",
  },
  {
    name: "Wintermute Wrapped Ether Market",
    tokenSymbol: "WETH",
    maximumCapacity: "1500",
    reserveRatio: "30",
    annualInterestRate: "4",
    status: VaultStatus.ACTIVE,
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
    status: VaultStatus.ACTIVE,
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

export const tableDataMock = [
  {
    lender: "Hudson",
    dateSubmitted: "12-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "1,000 DAI",
    status: "Pending",
    wallet: "0x287324837498sjdf098234lkjsef08234af",
    txID: "0x7a8b19c62f3854a9e013d83663dbb6f6",
  },
  {
    lender: "Smith",
    dateSubmitted: "15-Jul-2023",
    dateExecuted: "20-Jul-2023",
    amount: "2,500 DAI",
    status: "Approved",
    wallet: "0x874329847234sjdf432432lkjsef82384ad",
    txID: "0x2e1d4f8a5c7f30b1498d67b20e9a1dc3",
  },
  {
    lender: "Johnson",
    dateSubmitted: "10-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "500 DAI",
    status: "Completed",
    wallet: "0x129084379012sjdf987651lkjsef76543az",
    txID: "0x9f6c57d183eba4c6b705d924a891e1f7",
  },
  {
    lender: "Brown",
    dateSubmitted: "18-Jul-2023",
    dateExecuted: "19-Jul-2023",
    amount: "3,000 DAI",
    status: "Rejected",
    wallet: "0x768209478645sjdf784356lkjsef76598ba",
    txID: "0x4b3e8a91c61d79f5ad35b286a7f2c8d8",
  },
  {
    lender: "Davis",
    dateSubmitted: "22-Jul-2023",
    dateExecuted: "25-Jul-2023",
    amount: "1,200 DAI",
    status: "Approved",
    wallet: "0x329847325478sjdf657890lkjsef23487cd",
    txID: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
  },
  {
    lender: "Miller",
    dateSubmitted: "14-Jul-2023",
    dateExecuted: "16-Jul-2023",
    amount: "800 DAI",
    status: "Pending",
    wallet: "0x534982374568sjdf239804lkjsef65432fd",
    txID: "0x5c1d9e8f5a3f7b9d0c1b6d1c8e7f5b9a",
  },
  {
    lender: "Wilson",
    dateSubmitted: "11-Jul-2023",
    dateExecuted: "14-Jul-2023",
    amount: "1,750 DAI",
    status: "Completed",
    wallet: "0x784938274561sjdf128743lkjsef23467de",
    txID: "0x3d6a8e7f2b1c0d9f86a2b1d9c5a7f8b0",
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
  VaultStatus.ACTIVE,
  VaultStatus.PENALTY,
  VaultStatus.DELINQUENT,
  VaultStatus.TERMINATED,
]
