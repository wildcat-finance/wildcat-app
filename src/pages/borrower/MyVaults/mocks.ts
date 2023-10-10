import { Vault } from "../../../types/vaults";

export const mockedVaults: Vault[] = [
    {
        name: "Blossom Dai Stablecoin Vault",
        tokenSymbol: "DAI",
        maximumCapacity: "1000",
        reserveRatio: "20",
        annualInterestRate: "5",
    },
    {
        name: "Ethereum Vault",
        tokenSymbol: "ETH",
        maximumCapacity: "1500",
        reserveRatio: "30",
        annualInterestRate: "4",
    },
    {
        name: "Crypto Paradise Vault",
        tokenSymbol: "PARA",
        maximumCapacity: "800",
        reserveRatio: "25",
        annualInterestRate: "6",
    },
    {
        name: "Secure Token Vault",
        tokenSymbol: "STT",
        maximumCapacity: "1200",
        reserveRatio: "18",
        annualInterestRate: "4.5",
    },
    {
        name: "Digital Asset Vault",
        tokenSymbol: "DAT",
        maximumCapacity: "2000",
        reserveRatio: "22",
        annualInterestRate: "5.5",
    },
    {
        name: "Eco Token Vault",
        tokenSymbol: "ECO",
        maximumCapacity: "900",
        reserveRatio: "15",
        annualInterestRate: "6.5",
    },
]