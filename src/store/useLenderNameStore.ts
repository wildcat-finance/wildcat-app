import { create } from "zustand"
import { persist } from "zustand/middleware"

import { LenderNameStore } from "./interface"

export const useLenderNameStore = create<LenderNameStore>()(
  persist(
    (set) => ({
      setLenderName: (address: string, signature: string) =>
        set({
          [`lender-name-${address.toLowerCase()}`]: signature,
        }),
    }),
    {
      name: "lender_names",
    },
  ),
)

export { LenderNameStore }
