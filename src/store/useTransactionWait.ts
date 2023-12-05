import { create } from "zustand"

import { txStore } from "./interface"

export const useTransactionWait = create<txStore>()((set) => ({
  isTxInProgress: false,
  setisTxInProgress: (isTxInProgress: boolean) => set({ isTxInProgress }),
}))
