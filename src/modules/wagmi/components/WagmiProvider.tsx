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
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import type { ReactNode } from "react"
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
    new InjectedConnector({ chains, options: { name: "Browser Extension" } }),
    new CoinbaseWalletConnector({
      options: {
        appName: "Wildcat Finance",
        appLogoUrl:
          "https://avatars.githubusercontent.com/u/113041915?s=200&v=4",
      },
      chains,
    }),
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
      },
    }),
    new WalletConnectConnector({
      options: {
        metadata: {
          description:
            "An undercollateralised credit facility protocol: banking, but worse",
          name: "Wildcat Finance",
          url: "https://app.wildcat.finance",
          icons: [
            "https://avatars.githubusercontent.com/u/113041915?s=200&v=4",
          ],
        },
        projectId: "b129ed6623af640bbab035d6b906dfd6",
      },
      chains,
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
