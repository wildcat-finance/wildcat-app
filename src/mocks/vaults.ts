import {Vault, VaultStatus} from "../types/vaults";

export const mockedVaults: Vault[] = [
    {
        name: "Blossom Dai Stablecoin Vault",
        tokenSymbol: "DAI",
        maximumCapacity: "1000",
        reserveRatio: "20",
        annualInterestRate: "5",
        status: VaultStatus.ACTIVE,
        availableCapacity: "100"
    },
    {
        name: "Ethereum Vault",
        tokenSymbol: "ETH",
        maximumCapacity: "1500",
        reserveRatio: "30",
        annualInterestRate: "4",
        status: VaultStatus.ACTIVE,
        availableCapacity: "300"
    },
    {
        name: "Crypto Paradise Vault",
        tokenSymbol: "PARA",
        maximumCapacity: "800",
        reserveRatio: "25",
        annualInterestRate: "6",
        status: VaultStatus.PENALTY,
        availableCapacity: "345"
    },
    {
        name: "Secure Token Vault",
        tokenSymbol: "STT",
        maximumCapacity: "1200",
        reserveRatio: "18",
        annualInterestRate: "4.5",
        status: VaultStatus.ACTIVE,
        availableCapacity: "1005"
    },
    {
        name: "Digital Asset Vault",
        tokenSymbol: "DAT",
        maximumCapacity: "2000",
        reserveRatio: "22",
        annualInterestRate: "5.5",
        status: VaultStatus.DELINQUENT,
        availableCapacity: "1760"
    },
    {
        name: "Eco Token Vault",
        tokenSymbol: "ECO",
        maximumCapacity: "900",
        reserveRatio: "15",
        annualInterestRate: "6.5",
        status: VaultStatus.TERMINATED,
        availableCapacity: "95"
    },
]

export const mockedVaultTypes = [ 'Vault type 1', 'Vault type 2']
export const mockedRatios = mockedVaults.map(vault => vault.reserveRatio)
export const mockedUnderlyingAssets = mockedVaults.map(vault => vault.tokenSymbol)
