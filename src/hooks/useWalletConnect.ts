import { useEffect } from "react"
import { useAccount } from "wagmi"

import { useWalletConnectModalStore } from "../store/useWalletConnectModalStore"
import { useCurrentNetwork } from "./useCurrentNetwork"

export const useWalletConnect = () => {
  const { isConnected } = useAccount()
  const { isWrongNetwork } = useCurrentNetwork()
  const { setIsWalletModalOpen } = useWalletConnectModalStore()

  useEffect(() => {
    if (isConnected && isWrongNetwork) {
      setIsWalletModalOpen(true)
    }
  }, [isConnected, setIsWalletModalOpen])

  return {
    isConnected,
  }
}
