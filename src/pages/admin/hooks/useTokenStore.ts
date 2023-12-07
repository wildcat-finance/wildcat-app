import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TokenStore = {
  apiToken: string | undefined
  setApiToken: (cookie: string) => void
}

export const useApiTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      apiToken: undefined,
      setApiToken: (apiToken: string) => set({ apiToken }),
    }),
    {
      name: "api-token",
    },
  ),
)
