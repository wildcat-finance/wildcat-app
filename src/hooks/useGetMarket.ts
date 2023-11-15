import {
  getMarket,
  getMarketAccount,
  Market,
  Signer,
} from "@wildcatfi/wildcat-sdk"
import { useQuery } from "@tanstack/react-query"

import { useAccount } from "wagmi"
import { useEthersSigner } from "../modules/hooks"
import { useCurrentNetwork } from "./useCurrentNetwork"

const GET_MARKET_KEY = "get-market"

export const useGetMarket = (marketAddress: string | undefined) => {
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  async function getMarketByAddress() {
    const markets = await getMarket(marketAddress as string, signer as Signer)
    return markets || []
  }

  return useQuery({
    queryKey: [GET_MARKET_KEY, marketAddress],
    queryFn: getMarketByAddress,
    enabled: !!marketAddress && !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}

export const GET_MARKET_ACCOUNT_KEY = "get-market-account"

export const useGetMarketAccount = (market: Market | undefined) => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  async function getMarketAccountFn() {
    const marketAccount = await getMarketAccount(
      signer as Signer,
      address as string,
      market as Market,
    )
    return marketAccount
  }

  return useQuery({
    queryKey: [GET_MARKET_ACCOUNT_KEY, address],
    queryFn: getMarketAccountFn,
    enabled: !!market && !!address && !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}
