import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AgreementStore } from "./interface"

export const useAgreementStore = create<AgreementStore>()(
  persist(
    (set) => ({
      setSlaSignature: (address: string, signature: string) =>
        set({
          [`sla-signature-${address.toLowerCase()}`]: signature,
        }),
      setBorrowerSignature: (address: string, signature: string) =>
        set({
          [`borrower-signature-${address.toLowerCase()}`]: signature,
        }),
    }),
    {
      name: "sla-signatures",
    },
  ),
)
