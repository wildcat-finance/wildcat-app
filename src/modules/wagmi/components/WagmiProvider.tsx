import React from "react"
import {
  WagmiConfig,
  createConfig,
  configureChains,
  sepolia,
  mainnet,
} from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { InjectedConnector } from "wagmi/connectors/injected"
import { LedgerConnector } from "wagmi/connectors/ledger"
import type { ReactNode } from "react"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet],
  [
    alchemyProvider({
      apiKey: process.env.REACT_APP_ALCHEMY_API_KEY as string,
    }),
  ],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new InjectedConnector({ chains }),
    new LedgerConnector({ chains }),
  ],
  webSocketPublicClient,
})

interface WagmiProviderProps {
  children?: ReactNode
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
