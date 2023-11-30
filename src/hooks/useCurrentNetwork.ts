import { useNetwork } from "wagmi"
import { NETWORKS, TargetChainId } from "../config/networks"

export const useCurrentNetwork = () => {
  const { chain } = useNetwork()

  const isTestnet = chain?.id === NETWORKS.Sepolia.chainId

  return {
    chainId: chain?.id,
    isWrongNetwork: chain?.id !== TargetChainId,
    isTestnet,
  }
}
