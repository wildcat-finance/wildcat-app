import { Market } from "@wildcatfi/wildcat-sdk"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../modules/hooks"
import { useCurrentNetwork } from "./useCurrentNetwork"
import { useMarket } from "./useMarket"
import { useMarketAccount } from "./useMarketAccount"

export const useGetMarket = (marketAddress: string | undefined) => {
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  return useMarket({
    address: marketAddress,
    provider: signer,
    enabled: !!marketAddress && !!signer && !isWrongNetwork,
  })
}

export const GET_MARKET_ACCOUNT_KEY = "get-market-account"

export const useGetMarketAccount = (market: Market | undefined) => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  return useMarketAccount({
    market,
    lender: address,
    provider: signer,
    enabled: !!market && !!address && !!signer && !isWrongNetwork,
  })
}
