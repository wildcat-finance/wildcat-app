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
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { SafeConnector } from "wagmi/connectors/safe"
import { TargetChainId } from "../../../config/networks"

const networks = [sepolia, mainnet].filter((n) => n.id === TargetChainId)

const { chains, publicClient, webSocketPublicClient } = configureChains(
  networks,
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
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
      },
    }),
  ],
  webSocketPublicClient,
})

interface WagmiProviderProps {
  children?: ReactNode
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
