import * as React from "react"
import {
  type WalletClient,
  useWalletClient,
  usePublicClient,
  PublicClient,
} from "wagmi"
import { providers } from "ethers"
import { Signer } from "@wildcatfi/wildcat-sdk"
import { NETWORKS, TargetChainId } from "../../config/networks"

export function walletClientToSigner(walletClient: WalletClient): Signer {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport, network)
  const signer = provider.getSigner(account.address)
  return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId })
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  )
}

export function clientToWalletInfo(
  client: WalletClient | (PublicClient & { account?: undefined }),
) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }

  const provider = new providers.Web3Provider(transport, network)
  const signer =
    provider instanceof providers.JsonRpcProvider && account
      ? provider.getSigner(account.address)
      : undefined

  return {
    provider,
    signer,
    isTestnet: chain?.id === NETWORKS.Sepolia.chainId,
    isWrongNetwork: chain?.id !== TargetChainId,
    address: account?.address,
  }
}

type UseEthersProviderResult = {
  provider?: providers.Provider
  signer?: Signer
  address?: string
  isTestnet?: boolean
  isWrongNetwork?: boolean
}

export function useEthersProvider({
  chainId,
}: { chainId?: number } = {}): UseEthersProviderResult {
  const { data: walletClient } = useWalletClient({ chainId })
  const publicClient = usePublicClient({ chainId })
  const client = walletClient ?? publicClient

  return React.useMemo(
    () => (client ? clientToWalletInfo(client) : {}),
    [client],
  )
}
