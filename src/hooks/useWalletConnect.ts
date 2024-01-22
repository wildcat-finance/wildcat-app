import { useEffect } from "react"
import { useAccount } from "wagmi"

import { useWalletConnectModalStore } from "../store/useWalletConnectModalStore"
import { useCurrentNetwork } from "./useCurrentNetwork"

export const useWalletConnect = () => {
  const { isConnected } = useAccount()
  const { isWrongNetwork } = useCurrentNetwork()
  const { isOpen, setIsWalletModalOpen } = useWalletConnectModalStore()

  useEffect(() => {
    if (isConnected && isWrongNetwork && !isOpen) {
      setIsWalletModalOpen(true)
    }
  }, [isConnected, isOpen, setIsWalletModalOpen])

  return {
    isConnected,
  }
}
