import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAccount } from "wagmi"

import { useWalletConnectModalStore } from "../../../store/useWalletConnectModalStore"
import { BASE_PATHS } from "../../../routes/constants"
import { useCurrentNetwork } from "../../../hooks/useCurrentNetwork"

export const useWalletConnect = () => {
  const { isConnected } = useAccount()
  const { isWrongNetwork } = useCurrentNetwork()
  const { isOpen, setIsWalletModalOpen } = useWalletConnectModalStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConnected || isWrongNetwork) {
      navigate(BASE_PATHS.Borrower)

      if (!isOpen) {
        setIsWalletModalOpen(true)
      }
    }
  }, [isConnected, isOpen, setIsWalletModalOpen])

  return {
    isConnected,
  }
}
