import { create } from "zustand"

import { WalletConnectModalStore } from "./interface"

export const useWalletConnectModalStore = create<WalletConnectModalStore>()(
  (set) => ({
    isOpen: false,
    setIsWalletModalOpen: (isOpen: boolean) => set({ isOpen }),
  }),
)
