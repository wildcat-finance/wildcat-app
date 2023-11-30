import {
  SupportedChainId,
  SupportedChainIds,
  assert,
  isSupportedChainId,
} from "@wildcatfi/wildcat-sdk"

export enum EtherscanEntity {
  Address = "address",
  Transaction = "tx",
  Block = "block",
}

export const NETWORKS = {
  Sepolia: {
    chainId: 11155111,
    name: "sepolia",
    etherscanUrl: "https://sepolia.etherscan.io",
  },
  Mainnet: {
    chainId: 1,
    name: "mainnet",
    etherscanUrl: "https://etherscan.io",
  },
}

const targetNetwork = process.env.REACT_APP_TARGET_NETWORK
const isValidNetwork = (network: string): network is keyof typeof NETWORKS =>
  network in NETWORKS

assert(
  typeof targetNetwork === "string" && isValidNetwork(targetNetwork),
  `REACT_APP_TARGET_NETWORK is not set or is invalid. Must be one of ${Object.keys(
    NETWORKS,
  ).join(", ")}`,
)
export const TargetNetwork: (typeof NETWORKS)[keyof typeof NETWORKS] =
  NETWORKS[targetNetwork]

const targetChainId = TargetNetwork.chainId

assert(
  isSupportedChainId(targetChainId),
  `Chain ID ${targetChainId} is not supported. Must be one of ${SupportedChainIds.join(
    ", ",
  )}`,
)

export const TargetChainId: SupportedChainId = targetChainId

export const EtherscanBaseUrl = TargetNetwork.etherscanUrl
