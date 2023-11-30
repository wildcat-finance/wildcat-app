import { useNetwork } from "wagmi"
import { NETWORKS } from "../config/networks"

const CURRENT_CHAIN_ID = process.env
  .REACT_APP_CHAIN_ID as unknown as keyof typeof NETWORKS

const currentNetwork = NETWORKS[CURRENT_CHAIN_ID]

export const useCurrentNetwork = () => {
  const { chain } = useNetwork()

  const isWrongNetwork = chain?.id !== Number(CURRENT_CHAIN_ID)
  const isMainnet = chain?.id === NETWORKS["1"].chainId

  return {
    isWrongNetwork,
    currentNetwork,
    isMainnet,
  }
}
