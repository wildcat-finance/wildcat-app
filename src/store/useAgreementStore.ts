import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AgreementStore } from "./interface"

export const useAgreementStore = create<AgreementStore>()(
  persist(
    (set) => ({
      hasSignedAgreement: false,
      setSignedAgreement: (hasSignedAgreement: boolean) =>
        set({ hasSignedAgreement }),
    }),
    {
      name: "signed-agreement",
    },
  ),
)
