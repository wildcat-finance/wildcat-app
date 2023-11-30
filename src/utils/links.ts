import { useCurrentNetwork } from "../hooks/useCurrentNetwork"

export const getEtherscanLink = (address: string, type: "tx" | "address") => {
  const { isMainnet } = useCurrentNetwork()

  return `https://${isMainnet ? "" : "sepolia."}etherscan.io/${type}/${address}`
}
