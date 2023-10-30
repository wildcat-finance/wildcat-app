import { create } from "zustand"
import { persist } from "zustand/middleware"

import { BorrowerAgreementStore } from "./interface"

export const useBorrowerAgreementStore = create<BorrowerAgreementStore>()(
  persist(
    (set) => ({
      hasSignedAgreement: false,
      setSignedAgreement: (hasSignedAgreement: boolean) =>
        set({ hasSignedAgreement }),
    }),
    {
      name: "borrower-agreement",
    },
  ),
)
