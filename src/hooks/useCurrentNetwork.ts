import { useNetwork } from "wagmi"
import { NETWORKS } from "../config/networks"

export const useCurrentNetwork = () => {
  const { chain } = useNetwork()

  const isTestnet = chain?.id === NETWORKS.Sepolia.chainId

  return {
    chainId: chain?.id,
    isWrongNetwork: !isTestnet,
  }
}
